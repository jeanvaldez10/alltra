import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { IconDots } from '@tabler/icons-react'
import { ChartBar, Gift, Phone, PlusCircle, Video } from 'lucide-react'
import ChatMessageItem from '../chat/ChatMessageItem'
import { Direct, Events, Message, User } from '../../../@types'
import { useWebSocketStore } from '../../../client/websocket';
import axios from 'axios'
import { Constants } from '../../../client/constants'

interface ComponentProps {
    members: {
        name: string,
        avatar: string,
        id: string
    }[],
    isLoading?: boolean,
    author: {
        name: string,
        id: string,
        avatar: string
    },
    user: User,
    direct: Direct,
    messages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const ChatContent: React.FC<ComponentProps> = ({ members, isLoading, author, user, direct, messages, setMessages }) => {

    const [currentMessage, setCurrentMessage] = useState<{ content: string, channel: string }>({ content: "", channel: direct.id });
    const websocket = useWebSocketStore((state) => state.socket);

    const MessageFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentMessage.content) return;
        // setMessages((prev) => ([...prev, { createdAt: new Date(), content: currentMessage.content, channel: currentMessage.channel, id: "", by: user }]))
        const currentTimeCode = new Date()
        websocket?.send(JSON.stringify({
            e: Events.DIRECT_MESSAGE_CREATE,
            d: {
                channel: direct.id,
                content: currentMessage.content,
                code: currentTimeCode
            }
        }))

        setCurrentMessage((prev) => ({...prev, content: ""}))

    }

    const receiveMessage = (message: MessageEvent<any>) => {
        const data = JSON.parse(message.data);
        if (data.e == Events.DIRECT_MESSAGE_CREATE)
            setMessages((prev) => ([...prev, data.d]));
    }
    useEffect(() => {
        websocket?.addEventListener("message", receiveMessage)

        return () => websocket?.removeEventListener("message", receiveMessage)
    }, [websocket])


    return (
        <div className='flex flex-col w-full bg-neutral-950 h-[calc(100%-80px)] mt-8 rounded-3xl '>
            <div className='h-20 w-full flex items-center justify-between px-4 py-6'>
                <div className='flex  items-center'>
                    {
                        members.map((item, i) => {
                            return <Avatar key={i} className={i == 1 ? "-left-4 size-11 bg-neutral-950 rounded-full  z-50 p-1 relative select-none" : "select-none z-10"} >
                                <AvatarFallback >{isLoading ? "SC" : item.name?.split(" ")[0][0] + item.name?.split(" ")[1][0]}</AvatarFallback>
                                <AvatarImage src={item.avatar}></AvatarImage>
                            </Avatar>
                        })
                    }
                    <div>
                        <h1>{author.name}</h1>

                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='bg-neutral-900 rounded-full size-10 items-center flex justify-center'>
                        <Phone className=' size-5' />
                    </div>
                    <div className='bg-neutral-900 rounded-full size-10 items-center flex justify-center'>
                        <Video className=' size-5' />
                    </div>
                    <div className='bg-neutral-900 rounded-full size-10 items-center flex justify-center'>
                        <IconDots className=' rotate-90 size-5' />
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex flex-col-reverse overflow-y-auto'>
                <div className='flex flex-col gap-2 '>
                    {[...messages].map((message, i, arr) => {
                        const is_first_message =
                            i === 0 ||
                            arr[i - 1].by.id !== message.by.id

                        return (
                            <div key={i}>

                                <ChatMessageItem

                                    is_same_user={!is_first_message}
                                    key={i}
                                    content={message.content}
                                    full_name={message.by.full_name}
                                    avatar={''}
                                    id={message.id}
                                    user_id={message.by.id}
                                    createdAt={message.createdAt}
                                    isLoading={message.isLoading ? message.isLoading : false}
                                    is_selected={false}
                                    is_edit_mode={false}


                                />




                            </div>
                        );
                    })}
                </div>

            </div>
            <div className='w-full h-24 px-3 flex'>
                <div className='w-full bg-neutral-900/50 h-12 rounded-2xl my-auto px-4 flex gap-5 items-center'>
                    <PlusCircle className='text-neutral-400 bg-clip-text duration-100 hover:rotate-90' />
                    <form className='w-full' onSubmit={MessageFormSubmit}>
                        <input
                            autoFocus
                            value={currentMessage.content}
                            onChange={(e) => { setCurrentMessage((prev) => ({ ...prev, content: e.target.value })) }}
                            placeholder={`Message ${author.name}`} className='bg-transparent focus:outline-none placeholder-neutral-400  font-normal w-full'></input>
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