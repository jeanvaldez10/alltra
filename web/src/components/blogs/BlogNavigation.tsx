import React, { cache } from 'react'
import { Separator } from '../ui/separator'

const BlogNavigation = () => {
    return (
        <div className='sticky flex flex-col w-full max-w-[270px]'>
            <div className=''>
                <h1 className='text-2xl'>Navigation Table</h1>
                <ul className='flex flex-col gap-2 mt-2 ml-4'>
                    <li className='text-lg text-neutral-300'>Introduction</li>
                    <Separator />
                    <li className='text-lg text-neutral-300'>Content</li>
                    <Separator />
                    <li className='text-lg text-neutral-300'>Summary</li>
                    <Separator />
                    <li className='text-lg text-neutral-300'>Conclusion</li>
                </ul>
            </div>
   
            <div className='mt-8'>
                <h1 className='text-2xl'>Involved Topics</h1>
                <div className='flex max-w-52 flex-wrap gap-2 [&>*]:rounded-full mt-2 ml-4'>
                    <p className='text-blue-400 border rounded px-4 hover:text-white select-none cursor-pointer hover:bg-neutral-800 duration-75 text-sm py-1'>Tools</p>
                    <p className='text-blue-400 border rounded px-4 hover:text-white select-none cursor-pointer hover:bg-neutral-800 duration-75 text-sm py-1'>Workflow</p>
                    <p className='text-blue-400 border rounded px-4 hover:text-white select-none cursor-pointer hover:bg-neutral-800 duration-75 text-sm py-1'>Navigation</p>
                    <p className='text-blue-400 border rounded px-4 hover:text-white select-none cursor-pointer hover:bg-neutral-800 duration-75 text-sm py-1'>Analysis</p>

                </div>
            </div>
            <Separator className='my-4 bg-neutral-800'/>
            <div>

            </div>
        </div>
    )
}

export default BlogNavigation