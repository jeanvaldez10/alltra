"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Constants } from '../../../client/constants';
import { Direct, Message, User } from '../../../@types';
import { Button } from '../ui/button';
import DirectTabs from './tabs';
import ChatContent from './ChatContent';

const DirectMain: React.FC<{ id: string, user: User }> = ({ id, user }) => {
    const [direct, setDirect] = useState<Direct>({ id: "", members: [], pinned: [], createdAt: new Date() });
    const [currentPage, setCurrentPage] = useState<number>(0);
    const author_id = direct.members.filter((member) => member !== user.id)[0];
    const [author, setAuthor] = useState<{ name: string, avatar: string, id: string, isLoading?: boolean }>({ name: "", avatar: "", id: author_id, isLoading: true })
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const getMessages = async (_direct: Direct) => {

            const response = await axios.get(`${Constants.API_BASE}/direct/${_direct.id}/messages`, { withCredentials: true });
            const _messages = response.data.data.map((message: any) => {

                const by_user = message.by == user.id ? user : { full_name: author.name, ...author }
                return { ...message, by: by_user }
            })

            setMessages(_messages)
        }
        const getDirect = async () => {
            const response = await axios.get(`${Constants.API_BASE}/direct/${id}`, { withCredentials: true });

            setDirect(response.data.data)
            return response.data.data
        }
        getDirect().then((direct) => {
            getMessages(direct)
        });





        const getAuthor = async () => {
            const response = await axios.get(`${Constants.API_BASE}/direct/${id}/author`, { withCredentials: true });

            if (response.data.code == 200) {
                setAuthor({ ...response.data.data, isLoading: false })
            }
        }
        getAuthor()
    }, [id]);

    return (
        <div className='h-full'>
            <div className='flex items-center justify-between w-full'>
                <DirectTabs setCurrentPage={setCurrentPage} currentPage={currentPage}
                    items={[{ name: author.isLoading ? "John Doe" : author.name, id: 0, avatar: "something" }, { name: "All", id: 1, href: "/dashboard/direct" }, { name: "Friends", id: 2 },
                    { name: "Groups", id: 3 }
                    ]}
                />
                <Button className='bg-blue-600 text-white hover:bg-blue-700'>Add Friend</Button>
            </div>
            <ChatContent messages={messages} setMessages={setMessages} direct={direct} user={user} author={author} isLoading={author.isLoading} members={[author, { name: user.full_name, id: user.id, avatar: "" }]} />
        </div>

    )
}

export default DirectMain