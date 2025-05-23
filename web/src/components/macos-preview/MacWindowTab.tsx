import React from 'react'
import DateDisplay from "@/components/global/DateDisplay";
import TimeDisplay from "@/components/global/TimeDisplay";
import { BatteryFull } from "lucide-react";

const tab_items = ["Finder", "File", "Edit", "View", "Go", "Window", "Help"]

const WindowTab = () => {
  return (
    <div className="w-full h-10 flex items-center justify-between px-4  rounded-t-xl">
      <div className="flex items-center">
        <div>
          <img src="/logo.png" className="w-[19px] h-[18px]" />
        </div>
        <div className="ml-3">
          <ul className="text-sm flex items-center gap-3.5 text-neutral-300 select-none">
            {tab_items.map((item, i) => {
              return <li key={i} className="hover:text-neutral-400 cursor-pointer duration-100">{item}</li>
            })}
          </ul>
        </div>
      </div>
      <div className="flex items-center ">
        <BatteryFull className="w-6 h-5 mr-2.5" />
        <DateDisplay />
        <TimeDisplay />
      </div>
    </div>
  )
}

export default WindowTab