import { Search } from 'lucide-react'
import React from 'react'
import BlogPostCard from './BlogPostCard'

const filter_items = [
    { name: "All posts", active: true },
    { name: "New Articles", active: false },
    { name: "Tools", active: false },
    { name: "Tips", active: false },
]

const PostsSectionBlog = () => {
    return (
        <div>
            <div className='w-full flex justify-between'>
                <ul className='flex gap-2'>
                    {filter_items.map((item, i) => {
                        return <li key={i} className={`px-4 select-none cursor-pointer py-1 ${item.active ? "border" : "text-neutral-400"} rounded-full`}>{item.name}</li>
                    })}
                </ul>
                <div className='flex items-center gap-3 border border-neutral-800 px-3.5 rounded-full' >
                    <Search className='size-5 text-neutral-500' />
                    <input placeholder='Search...' className='bg-transparent placeholder-neutral-500' />
                </div>
            </div>
            <div className='mt-8 grid grid-cols-3 gap-4'>
                {[...Array(2)].map((j, i) => {
                    return <BlogPostCard key={i} title='How to Choose the right tools for trading.' description='Stay informed with our latest blogs, offering valuable insights and ........' read='35 min read' date='Feb 25, 2025' />
                })}

            </div>
        </div>
    )
}

export default PostsSectionBlog