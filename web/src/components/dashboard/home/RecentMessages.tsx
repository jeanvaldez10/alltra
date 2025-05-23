import React from 'react'
import RecentMessageItem from './components/RecentMessageItem'

const text_messages = [
    {
        name: "SkyzoX Codes",
        avatar: "",
        date: new Date(),
        username: "skyzoxcodes"
    }
]

const RecentMessages = () => {
  return (
    <div className="w-full rounded-3xl   bg-neutral-900/40 p-4 min-h-60 flex flex-col gap-2 max-h-64 overflow-y-auto custom-scrollbar">
        {text_messages.map((message, i) => {
            return <RecentMessageItem key={i} {...message}/>
        })}
    </div>
  )
}

export default RecentMessages