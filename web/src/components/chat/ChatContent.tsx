"use client";

import { ChartBar, Gift, Hash, PlusCircleIcon, Trash, Users } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import useMembersListStore from '@/hooks/use-chat-members';
import ChatMessageItem from './ChatMessageItem';
import { Channel, Events, Message, User } from '../../../@types';
import { useWebSocketStore } from '../../../client/websocket';
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import axios from 'axios';
import { Constants } from '../../../client/constants';
import { usePathname } from 'next/navigation';

const ChatContent: React.FC<{ user: User, channel: Channel, first_messages: Message[] }> = ({ channel, first_messages, user }) => {
    const membersList = useMembersListStore();
    const [messages, setMessages] = useState<Message[]>(first_messages);
    const [currentMessage, setCurrentMessage] = useState<{ content: string, channel: string, code?: string }>({ code: '', content: "", channel: channel.id });
    const WebSocketService = useWebSocketStore(state => state.socket);
    const [currentContextMenu, setCurrentContextMenu] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editMessage, setEditMessage] = useState<Message>({ content: "", id: "", by: user, createdAt: new Date(), channel: channel.id });


    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (isEditMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditMode]);

    const MessageSendHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentMessage.content) return;

        const code = Math.random().toString(36).substring(7);

        // Make sure WebSocketService is active
        if (WebSocketService?.readyState === WebSocket.OPEN) {
            console.log("📤 Sending message via WebSocket:", {
                content: currentMessage.content,
                channel: channel.id,
                code
            });

            // Send via WebSocket only
            WebSocketService.send(JSON.stringify({
                e: Events.MESSAGE_CREATE,
                d: {
                    content: currentMessage.content,
                    channel: channel.id,
                    code
                }
            }));

            // Add optimistic message to local state
            setMessages((prev) => ([
                ...prev,
                {
                    code,
                    content: currentMessage.content,
                    by: user,
                    id: "",
                    createdAt: new Date(),
                    channel: channel.id,
                    isLoading: true
                }
            ]));

            setCurrentMessage({ code: "", content: "", channel: channel.id });
        } else {
            console.error("❌ WebSocket not connected! Cannot send message.");
            // Show an error to the user
            alert("Connection lost. Please refresh the page to reconnect.");
        }
    }
    const DeleteMessage = (id: string) => {
        WebSocketService?.send(JSON.stringify({ e: Events.MESSAGE_DELETE, d: { id } }))
    }



    const messageRecievedHandler = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.e === Events.MESSAGE_CREATE) {

            setMessages((prev) => {
                const new_messages = [...prev];
                const index = new_messages.findIndex((message) => message.code === data.d.code);
                if (index !== -1) {
                    new_messages[index] = data.d;
                } else {
                    new_messages.push(data.d);
                }
                return new_messages;
            })
        }
    }

    useEffect(() => {
        WebSocketService?.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.e === Events.MESSAGE_DELETE) {
                setMessages((prev) => prev.filter((message) => message.id !== data.d.id));
            }
            if (data.e === Events.MESSAGE_UPDATE) {
                setMessages((prev) => prev.map((message) => message.id === data.d.id ? { ...message, content: data.d.content } : message));
            }
        })
        WebSocketService?.addEventListener('message', messageRecievedHandler);
        return () => {
            WebSocketService?.removeEventListener('message', () => messageRecievedHandler);
        }
    }, [WebSocketService]);

    const EditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editMessage?.content) {
            setMessages((prev) => prev.filter((message) => message.id !== editMessage?.id))
            WebSocketService?.send(JSON.stringify({ e: Events.MESSAGE_DELETE, d: { id: editMessage?.id } }))
            setIsEditMode(false);
            setEditMessage({ content: "", id: "", by: user, createdAt: new Date(), channel: channel.id });
            return;
        }
        setMessages((prev) => prev.map((message) => message.id === editMessage?.id ? { ...message, content: editMessage?.content } : message))
        WebSocketService?.send(JSON.stringify({ e: Events.MESSAGE_UPDATE, d: { id: editMessage?.id, content: editMessage?.content } }))
        setIsEditMode(false);
        setEditMessage({ content: "", id: "", by: user, createdAt: new Date(), channel: channel.id });
    }
    const pathname = usePathname();
    useEffect(() => {
        const testChannel = async () => {
            const response = await axios.get(`${Constants.API_BASE}/chat/channel/${channel.id}`, { withCredentials: true });

            console.log(response.data);
        }
        testChannel();
    }, [pathname]);


    return (
        <div className='w-full h-full flex flex-col   bg-neutral-950/50'>
            <div className='w-full h-14 border-b border-neutral-900 p-4 justify-between flex'>
                <h1 className='flex text-lg items-center gap-2'><Hash className='size-6' />{channel.name}</h1>
                <Users className={`${membersList.isMembersListVisible ? "text-neutral-200" : "text-neutral-300"}  cursor-pointer`} onClick={() => { membersList.toggleMembersList() }} />
            </div>
            <div className="h-full gap-2 custom-scrollbar py-2  w-full rounded-lg flex flex-col-reverse overflow-y-auto ">
                <div className='flex flex-col gap-2'>
                    {[...messages].map((message, i, arr) => {
                        const is_first_message =
                            i === 0 ||
                            arr[i - 1].by.id !== message.by.id

                        return (
                            <div key={i}>
                                <ContextMenu onOpenChange={(open) => { setCurrentContextMenu(open ? message.id : null) }}>
                                    <ContextMenuTrigger >
                                        <ChatMessageItem
                                            EditSubmit={EditSubmit}
                                            is_same_user={!is_first_message}
                                            key={i}
                                            content={message.content}
                                            full_name={message.by.full_name}
                                            avatar={''}
                                            id={message.id}
                                            user_id={message.by.id}
                                            createdAt={message.createdAt}
                                            isLoading={message.isLoading ? message.isLoading : false}
                                            is_selected={currentContextMenu === message.id}
                                            is_edit_mode={isEditMode}
                                            editMessage={editMessage}
                                            setIsEditMode={setIsEditMode}
                                            setEditMessage={setEditMessage}
                                        />


                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-64">
                                        <ContextMenuItem inset>
                                            Copy
                                            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                                        </ContextMenuItem>
                                        <ContextMenuItem inset >
                                            Reply
                                            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                                        </ContextMenuItem>
                                        <ContextMenuItem inset onClick={() => { setEditMessage(message); setIsEditMode(true) }} className={message.by.id === user.id ? "" : "hidden"}>
                                            Edit
                                            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                                        </ContextMenuItem>
                                        <ContextMenuSub>
                                            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                                            <ContextMenuSubContent className="w-48">
                                                <ContextMenuItem>
                                                    Save Message As...
                                                    <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                                                </ContextMenuItem>
                                                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                                                <ContextMenuItem>Name Window...</ContextMenuItem>
                                                <ContextMenuSeparator />
                                                <ContextMenuItem>Trader Tools</ContextMenuItem>
                                            </ContextMenuSubContent>
                                        </ContextMenuSub>
                                        <ContextMenuSeparator />
                                        <ContextMenuCheckboxItem checked>
                                            Show Bookmarks Bar
                                            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                                        </ContextMenuCheckboxItem>
                                        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuRadioGroup value="pedro">

                                            <ContextMenuRadioItem value="pedro">
                                                Reply in Private
                                            </ContextMenuRadioItem>
                                            <ContextMenuItem
                                                onClick={() => { DeleteMessage(message.id) }}

                                                className={message.by.id === user.id ? "text-red-600 hover:text-red-700" : "hidden"}
                                            >
                                                <Trash className="mr-2 h-4 w-4 inline-block text-red-800 " /> {/* Custom icon color */}
                                                Delete
                                            </ContextMenuItem>
                                        </ContextMenuRadioGroup>
                                    </ContextMenuContent>
                                </ContextMenu>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='w-full h-24 px-4 flex'>
                <div className='w-full bg-neutral-900/50 h-12 rounded-lg my-auto px-4 flex gap-5 items-center'>
                    <PlusCircleIcon className='text-neutral-400 bg-clip-text duration-100 hover:rotate-90' />
                    <form onSubmit={MessageSendHandler} className='w-full'>
                        <input
                            autoFocus
                            onChange={(e) => { setCurrentMessage((prev) => ({ ...prev, content: e.target.value })) }} value={currentMessage.content} placeholder={`Message #${channel.name}`} className='bg-transparent focus:outline-none placeholder-neutral-400  font-normal w-full'></input>
                    </form>

                    <div className='flex gap-3'>
                        <Gift className='text-neutral-400' />
                        <ChartBar className='text-neutral-400' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatContent