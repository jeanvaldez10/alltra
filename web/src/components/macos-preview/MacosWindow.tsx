"use client"
import React from 'react'
import WindowContainer from './WindowContainer';
import WindowTab from './MacWindowTab';
import WindowItem from './WindowItem';

const MacosWindow = () => {

    return (
        <div>
            
            <WindowContainer>
            <div className="absolute -z-10 h-[850px] w-[1400px] bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <WindowTab />
                <WindowItem></WindowItem>
            </WindowContainer>
            </div>
            
    )
}

export default MacosWindow