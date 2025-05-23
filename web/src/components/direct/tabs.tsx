"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { X } from 'lucide-react';

interface ComponentProps {
    items: {
        name: string;
        id: number;
        href?: string;
        avatar?: string;
    }[];
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const DirectTabs: React.FC<ComponentProps> = ({ items, currentPage, setCurrentPage }) => {
    // State to track which item is hovered (using id)
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <div className="bg-neutral-950 rounded-3xl p-1 flex items-center gap-2">
            {items.map((item) => {
                // Item with avatar (e.g., "account")
                if (item.avatar) {

                    return (
                        <div
                            key={item.id}
                            className={`flex gap-2 items-center pl-1 pr-3 py-1 select-none ${currentPage === item.id ? "bg-neutral-900 rounded-2xl" : "text-neutral-400 cursor-pointer"
                                }`}
                            onClick={() => setCurrentPage(item.id)}

                        >
                            <Avatar className="size-6 py-0 relative"
                                onMouseOver={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}   >

                                {/* Hover effect only for "account" */}
                                {hoveredId === item.id ? (
                                    <div className="absolute inset-0 bg-black/20 rounded-full cursor-pointer flex items-center justify-center" >
                                        <X className='size-3 text-neutral-400'/>
                                    </div>
                                ) : <><AvatarFallback className="text-xs h-full">
                                    {item.name.split(" ")[0]?.[0] ?? "" + item.name.split(" ")[1]?.[0] ?? ""}
                                </AvatarFallback>
                                    <AvatarImage src={item.avatar} /></>}
                            </Avatar>
                            <p className="text-sm">{item.name}</p>
                        </div>
                    );
                }

                // Item with href
                if (item.href) {
                    return (
                        <Link key={item.id} href={item.href}>
                            <p
                                className={`px-3 py-1 text-sm select-none ${currentPage === item.id ? "bg-neutral-900 rounded-2xl" : "text-neutral-400 cursor-pointer"
                                    }`}
                                onClick={() => setCurrentPage(item.id)}
                            >
                                {item.name}
                            </p>
                        </Link>
                    );
                }

                // Default item (no avatar or href)
                return (
                    <p
                        key={item.id}
                        className={`text-sm px-3 py-1 select-none ${currentPage === item.id ? "bg-neutral-900 rounded-2xl" : "text-neutral-400 cursor-pointer"
                            }`}
                        onClick={() => setCurrentPage(item.id)}
                    >
                        {item.name}
                    </p>
                );
            })}
        </div>
    );
};

export default DirectTabs;