import React from 'react'

const items = [
    {
        available: true,
        image: "",
        title: "MayTrade",
        href: ""
    },
    {
        available: true,
        image: "",
        title: "MayTrade",
        href: ""
    },
    {
        available: true,
        image: "",
        title: "MayTrade",
        href: ""
    },
    {
        available: true,
        image: "",
        title: "MayTrade",
        href: ""
    }
]

const page = () => {
  return (
    <div className='p-10 w-full'>
        <h1 className='text-neutral-400'>Select a guide to get started with MayTrade Platorms</h1>
        <div className='grid grid-cols-2 w-full gap-8 mt-8'>
            {items.map((item) => {
                return <div className='bg-neutral-950/50  w-full p-4 rounded-3xl aspect-[2/1]'>
                    <h1 className='text-xl font-bold'>{item.title}</h1>
                </div>
            })}
        </div>
    </div>
  )
}

export default page