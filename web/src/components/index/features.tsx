"use client";

import React, { useState } from 'react'
import { FloatingDock } from '../ui/floating-dock'
import {
    IconBrandGithub,
    IconBrandX,
    IconExchange,
    IconHome,
    IconMessage,
    IconNewSection,
    IconTerminal2,
} from "@tabler/icons-react";
import { LayoutDashboard } from 'lucide-react';
const links = [
    {
        title: "Home",
        icon: (
            <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
    },

    {
        title: "Dashboard",
        icon: (
            <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
    },
    {
        title: "MayKit",
        icon: (
            <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
    },
    {
        title: "MayChat",
        icon: (
            <IconMessage className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
    },
];

const tabs = [
    {
        name: "Trading Academy",
        id: 1
    },
    {
        name: "Asssignments",
        id: 2
    },
    {
        name: "Notes",
        id: 3
    },
    {
        name: "Certificates",
        id: 4
    },
    {
        name: "Model 1",
        id: 5
    },
    {
        name: "Model 2",
        id: 6
    }
]

const chapters: string[] = [
    "Fundamentals to a Trade Setup",
    "Algorithmic Deliveries in Financial Markets",
    "Decoding Market Structure with Algorithmic Precision",
    "Institutional Trade Entry Framework",
    "Mastering Risk & Market Psychology"
];

const Features = () => {
    const [currentTab, setCurrentTab] = useState<number>(1);

    return (
        <div>

            <div className='w-full text-center'>
                <h1 className='text-4xl font-bold'>The features provided by each May-Platform.</h1>
                <h2 className='text-xl text-neutral-400'>Select a May-Platform, and have a in-depth look at the features provided</h2>
            </div>
            <div className='max-w-5xl mx-auto'>


                <div className='border rounded-xl p-6 mt-8 h-[550px] flex flex-col w-full'>
                    <div className='flex justify-between gap-2 px-5 py-2.5 border rounded-full' id='tabs'>
                        {tabs.map((tab, i) => {
                            return <div onClick={() => setCurrentTab(tab.id)} key={tab.name} className={`${tab.id == currentTab ? "border-neutral-800" : "border-transparent"}  border px-5 cursor-pointer select-none py-2 rounded-full`}>
                                <p>{tab.name}</p>
                            </div>
                        })}
                    </div>
                    <div className='flex h-full'>
                        <div className='w-[40%] p-8 pr-0 pt-16'>
                            <h1 className='text-4xl font-bold'>Trading Academy</h1>
                            <p className='text-lg mt-4 text-neutral-300'>Learn to trade step by step with our 5-chapter blueprint. Our expert mentors guide you through each stage, helping you master smart money algorithmic trading and become a skilled day trader.</p>
                        </div>
                        <div className='w-[60%] py-4 h-full'>
                            <div className='border rounded-xl pb-5 p-4 flex gap-2 px-10'>
                                <div className='flex flex-col'>
                                    <h1 className='text-neutral-400'>Chapters</h1>
                                    <div className='flex flex-col gap-4 mt-4'>
                                        {chapters.map((chapter, i) => {
                                            return <div key={i} className='flex items-center gap-2'>
                                                <div className='bg-neutral-950 rounded-xl size-8 flex justify-center items-center'>
                                                    <LayoutDashboard className='size-5' />
                                                </div>
                                                <p className='text-sm text-neutral-100'>{chapter}</p>
                                            </div>
                                        })}
                                    </div>

                                </div>
                                <div className=''>
                                    <h1 className='text-neutral-400'>Lessons</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Features