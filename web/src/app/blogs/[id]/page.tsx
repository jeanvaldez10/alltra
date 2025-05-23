import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const param = await params;
    const id = param.id
    return (
        <div className='w-full px-4'>
            <Link className='flex items-center text-neutral-500 gap-1 mb-4 hover:text-white duration-75 rounded-full  w-max' href='/blogs'>
                <ArrowLeft className=' relative right-1 size-5 ' />
                <span className=''>Back to All Blogs</span>
            </Link>
            <div>
                <h1 className='text-5xl font-bold mt-2'>How to Choose the right
                    tools for trading.</h1>
                <p className='text-neutral-400 text-lg max-w-xl mt-2'>Stay informed with our latest blogs, offering valuable insights and
                    important tools to help you succeed in Trading.</p>
            </div>
            <div className='w-full flex items-center mt-6 justify-between'>
                <div className='flex items-center gap-1'>
                    <Clock className='size-5'></Clock>
                    <p className='text-neutral-300'>35 min read</p>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                        <Calendar className='size-5' />
                        <p className='text-neutral-300'>Feb 25, 2025</p>
                    </div>
                    <div className='w-px h-6 bg-neutral-800'></div>
                    <p className='text-blue-400 border rounded px-4 hover:text-white select-none cursor-pointer hover:bg-neutral-800 duration-75 text-sm py-1'>TOOLS</p>
                </div>
            </div>
        </div>
    )
}

export default page