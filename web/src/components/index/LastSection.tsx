import React from 'react'
import QuestionsContactSection from '../QuestionsContactSection'
import { Button } from '../ui/button'

const data_badge = [
    {
        name: "Academy",
        color: "bg-blue-600 text-blue-200"
    },
    {
        name: "MayKit",
        color: "bg-red-500 text-red-200"
    },
    {
        name: "Dashboard",
        color: "bg-yellow-900 text-yellow-200"
    },
]

const LastSection = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <div className='flex flex-col'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Get Started in seconds</h1>
                    <p className='text-neutral-500 text-lg' >Launch your new experience</p>
                    <div className='mt-10'>
                        <div className='flex gap-4 justify-center mb-1'>
                            {data_badge.map((item, i) => {
                                return <p key={i} className={`px-4 border border-black  shadow-lg  shadow-neutral-950 py-1 rounded-full ${item.color} text-neutral-200`}>{item.name}</p>
                            })}
                        </div>
                        <p className='text-neutral-500 text-lg max-w-3xl mx-auto'>Our platforms work together to guide you step by step, no matter your trading
                            expertise. <span className='text-white'>Select your goal</span>, and we'll handle everything else to help you
                            succeed.</p>
                    </div>
                    <Button className='text-lg px-5 py-2 border bg-neutral-900 text-white hover:text-black mt-5 '>Get Started</Button>

                </div>
            </div>
            <QuestionsContactSection />
        </div>
    )
}

export default LastSection