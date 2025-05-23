"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const menuItems = [
  {
    href: "/dashboard", icon: "/maytrade.svg", color: "bg-neutral-800"
  },
  {
    href: "/chat", icon: "/maychat.svg", color: "bg-gradient-to-tl from-orange-600/20 to-orange-500/50"
  },

  {
    href: "/maylearn", icon: "/maylearn.svg", color: "bg-gradient-to-b from-purple-600/50 to-purple-800/50"
  },
  {
    href: "/maykit", icon: "/maykit.svg", color: "bg-gradient-to-b from-blue-600/50 to-blue-800"
  },
];

const DashboardSidebarPlatforms: React.FC = () => {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = React.useState<number>(0)

  React.useEffect(() => {
    const current_index = menuItems.indexOf(menuItems.find((item) => pathname == item.href || pathname.includes(item.href)) as any);
    setSelectedItem(current_index);
  }, [])
  return (
    <div className="h-full  bg-black  border-r p-2  backdrop-blur-2xl w-16 z-50   flex flex-col justify-between items-center">
      <div className="flex flex-col items-center gap-8">

        <ul className="flex w-12 flex-col gap-2 rounded-2xl justify-center items-center [&>li]:rounded-2xl bg-neutral-900/60 p-1">
          {
            menuItems.map((item, i) => {
              return <TooltipProvider delayDuration={50} key={i}>
                <Tooltip >
                  <TooltipTrigger className={`${item.color} py-2.5 rounded-xl px-2.5 `}>
                    <Link href={item.href} ><img src={item.icon} /></Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className=" capitalize">{item.href.replace("/", "")}</p></TooltipContent>
                </Tooltip>

              </TooltipProvider>
            })
          }
        </ul>
      </div>

    </div>
  );
};

export default DashboardSidebarPlatforms;