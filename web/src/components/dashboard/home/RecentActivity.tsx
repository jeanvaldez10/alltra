"use client";

import ItemHoverIcon from '@/components/global/ItemHoverIcon'
import React from 'react'


const itemsActivity = [
    {
        icon: "/dashboard.svg",
        name: "Dashboard",
        color: "bg-gradient-to-t from-[#0c30b3] to-blue-600"

    },
    {
        icon: "/journal.svg",
        name: "Journal",
        color: "bg-gradient-to-t from-[#ff8900] to-orange-600"

    },
    {
        icon: "/graph.svg",
        name: "Statistics",
        color: "bg-gradient-to-t from-[#a83aff] to-purple-500 "

    },
    {
        icon: "/tracker.svg",
        name: "Trackers",
        color: "bg-gradient-to-t from-[#d93462] to-pink-600 "

    }
]
const RecentActivity = () => {
    return (
        <div className="w-full rounded-3xl bg-primary p-4 min-h-60 flex flex-col gap-2 max-h-60 overflow-y-auto custom-scrollbar">

            {itemsActivity.map((item, i) => {
                return <ItemHoverIcon key={i} color={item.color} name={item.name} icon={item.icon} />
            })}
        </div>
    )
}

export default RecentActivity