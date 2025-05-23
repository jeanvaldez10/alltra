"use client";

import React, { useState } from 'react'
import DirectTabs from './tabs';
import { Button } from '../ui/button';
import MainTabsDirect from './tabs/index';
import { User } from '../../../@types';



const Direct: React.FC<{user: User}> = ({user}) => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    return (
        <div className=' w-full h-full'>
            <div className='flex items-center justify-between w-full'>
                <DirectTabs setCurrentPage={setCurrentPage} currentPage={currentPage}
                    items={[{ name: "All", id: 0 }, { name: "Friends", id: 1 },
                    { name: "Groups", id: 2 }
                    ]}
                />
                <Button className='bg-blue-600 text-white hover:bg-blue-700'>Add Friend</Button>
            </div>
            {
                currentPage == 0 && <MainTabsDirect user={user as User} />
            }
        </div>
    )
}

export default Direct;