"use client";
import React from 'react'
import { Button } from '../ui/button';
import { WavyBackground } from '../ui/wavy-background';
import { Spotlight } from '../ui/spotlight-new';
import { User } from '../../../@types';
import Navbar from '../global/navbar';
import Link from 'next/link';

const HeroSection: React.FC<{user: User | null}> = ({user}) => {
    return (

            <div className="h-[50rem] -top-[64px] w-full rounded-md flex md:items-center md:justify-center  antialiased bg-grid-white/[0.02] relative overflow-hidden">
               <Spotlight />
                
                <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                    
                    <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                        All In one platform<br />
                        Welcome to MayTrade
                    </h1>
                    <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                        A Platform that is designed to make you better.
                    </p>
                    <div className='flex gap-2 mt-4 justify-center'>
                        <Button className='rounded-full'>Start for free</Button>
                        <Button className='rounded-full' variant="outline">Explore more</Button>
                    </div>

                   
                </div>
                
            </div>


    )
}

export default HeroSection