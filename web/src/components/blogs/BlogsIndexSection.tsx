"use client"
import Link from 'next/link'
import React from 'react'
import { HoverBorderGradient } from '../ui/hover-border-gradient'
import { CardBody, CardContainer, CardItem } from '../ui/3dCard'

const BlogsFirstSection = () => {
  return (
    <div className='mt-32'>
      <div className='flex flex-col gap-1'>
        <HoverBorderGradient
          containerClassName="rounded-full "
          as="button"
          className="text-base   justify-center  "
        >

          <span>Join Discord</span>
        </HoverBorderGradient>
        <h1 className='text-4xl'>Blogs, News articles, Tools & Tips</h1>
        <p className='max-w-2xl mt-4 text-neutral-200'>Stay informed with our latest blogs, offering valuable insights and important tools to help you succeed in Trading.</p>
      </div>
      <div className='w-full flex gap-4 h-80 mt-8'>

        <div className='h-full w-full rounded-xl duration-75 hover:scale-[1.02] cursor-pointer' style={{
          backgroundImage: "url('https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}></div>




        <CardContainer>
          <CardBody>
            <div className='max-w-sm w-full flex flex-col gap-4 h-full border rounded-xl p-6 duration-75 hover:scale-[1.02] cursor-pointer'>
              <CardItem translateZ={50}>
                <div className='flex gap-2'>
                  <p className='text-blue-400 border rounded px-4 hover:text-white select-none cursor-pointer hover:bg-neutral-800 duration-75 text-sm py-1'>TOOLS</p> <p className='text-blue-400 border rounded px-4 hover:text-white select-none cursor-pointer hover:bg-neutral-800 duration-75 text-sm py-1'>LATEST POST</p>
                </div>
              </CardItem>
              <CardItem translateZ={80}>
                <div className=' space-y-2'>
                  <h1 className='text-2xl'>
                    How to Choose the right tools for trading.
                  </h1>
                  <p className='text-neutral-400 text-lg'>
                    Stay informed with our latest blogs,
                    offering valuable insights and ........
                  </p>
                </div>
              </CardItem>
              <CardItem translateZ={100} className='w-full mt-auto'>
                <div className='flex justify-between mt-auto'>
                  <p>35 min read</p><p>Feb 25, 2025</p>
                </div>
              </CardItem>

            </div>
          </CardBody>

        </CardContainer>

      </div>
    </div>
  )
}

export default BlogsFirstSection
