import React from 'react'

interface PostCardProps {
    title: string,
    description: string,
    read: string,
    date: string
}
const BlogPostCard: React.FC<PostCardProps> = ({title, description, read, date}) => {
  return (
    <div className='border border-neutral-800 p-6 w-full max-w-sm rounded-xl duration-75 hover:bg-neutral-950 cursor-pointer'>
        <div className='mb-6'>
            <h1 className='text-2xl'>{title}</h1>
            <p className='text-neutral-400'>{description}</p>
        </div>
        <div className='w-full flex justify-between items-center'>
            <p>{read}</p><p>{date}</p>
        </div>
    </div>
  )
}

export default BlogPostCard