import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import React from 'react'

interface ComponentProps {
    date: Date;
    name: string;
    avatar: string;
    username: string;
}

const RecentMessageItem: React.FC<ComponentProps> = ({ name, avatar, date, username }) => {
    return (
        <div className='flex items-center justify-between p-1.5'>
            <div className='flex items-center gap-2'>
                <Avatar>
                    <AvatarFallback >{name.split(" ")[0][0] + name.split(" ")[1][0]}</AvatarFallback>
                    <AvatarImage src={avatar} />
                </Avatar>
                <div>
                    <p className='text-sm'>{name}</p>
                    <p className='text-xs text-neutral-400'>{username}</p>
                </div>

            </div>
            <div>
                <p className='text-sm text-neutral-400'>
                    20min ago
                </p>
            </div>
        </div>
    )
}

export default RecentMessageItem