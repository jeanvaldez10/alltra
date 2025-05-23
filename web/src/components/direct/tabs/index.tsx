import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import axios from 'axios';
import { Constants } from '../../../../client/constants';
import Link from 'next/link';
import { User } from '../../../../@types';

const MainTabsDirect: React.FC<{ user: User }> = ({ user }) => {
    const [friends, setFriends] = useState<{ name: string, avatar: string, date: Date, id: string }[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const getFriends = async () => {
            const response = await axios.get(`${Constants.API_BASE}/direct/friends`, { withCredentials: true });

            setFriends(response.data.friends.filter((friend: typeof friends[0]) => friend.id !== user.id));
            
        }
        getFriends()
    }, []);

    const filteredMembers = friends.filter(member =>
        member.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='mt-8 bg-neutral-950 w-full h-[calc(100%-80px)] rounded-3xl p-8'>
            <div className='flex items-center justify-between bg-neutral-900 py-2 px-4 rounded-2xl'>
                <input
                    className="bg-transparent text-sm  !border-0 focus:!border-0 focus-visible:!border-0 ring-0 focus:ring-0 focus-visible:ring-0 outline-none focus:outline-none focus-visible:outline-none text-neutral-400 placeholder-neutral-400 transform transition-all duration-300 ease-in-out translate-x-0 opacity-100"
                    placeholder="Search friends..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Search className='text-neutral-400' />
            </div>

            <div className='mt-6 flex flex-col gap-2'>
                {filteredMembers.map((friend, i) => {
                    return <Link href={`/dashboard/direct/${friend.id}`} key={i} className='flex items-center justify-between hover:bg-neutral-900 p-2.5 rounded-2xl cursor-pointer select-none'>
                        <div className='flex gap-2 items-center'>
                            <Avatar>
                                <AvatarFallback>{friend.name.split(" ")[0][0] + friend.name.split(" ")[1][0]}</AvatarFallback>
                                <AvatarImage src={friend.avatar}></AvatarImage>
                            </Avatar>
                            <p className='text-neutral-400'>{friend.name}</p>
                        </div>
                        <time className='text-xs text-neutral-400'>{friend.date.toString()}</time>

                    </Link>
                })}
            </div>

        </div>
    )
}

export default MainTabsDirect;