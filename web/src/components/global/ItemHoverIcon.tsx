import React from 'react'

interface ComponentProps {
    name: string;
    icon: string;
    color: string
}

const ItemHoverIcon: React.FC<ComponentProps> = ({color, icon, name}) => {
    return (
        <div className={`text-neutral-400 p-1.5  flex items-center gap-2 rounded-xl text-sm duration-200 hover:bg-neutral-900 hover:text-white select-none cursor-pointer`}>
            <img src={icon} className={`${color} w-8 h-8  text-white  rounded-lg object-contain p-1.5`} />
            <h1 className='text-[12px] font-semibold select-none'>{name}</h1>
        </div>
    )
}

export default ItemHoverIcon