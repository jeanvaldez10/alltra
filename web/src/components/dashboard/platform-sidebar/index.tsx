"use client";
import { TooltipProvider } from "@/components/ui/tooltip";

import { SideBarItem } from "./SidebarItem";
import { Icons } from "@/components/global/icons";

const links: {
  title: string;
  label?: string;
  icon: string;
  class: string;
  href: string;
}[] = [
  {
    title: "Main",
    icon: "/alltra-main.svg",
    class: "bg-gradient-to-t from-[#002BFF] to-blue-400 ",
    href: "/main",
  },
  {
    title: "Tracker",
    icon: "/activity-tracker.svg",
    class: "bg-gradient-to-t from-[#E11D48] to-[#A40A2C] ",
    href: "/dashboard/tracker",
  },
  {
    title: "Optimizer",
    icon: "/alltra-optimizer.svg",
    class: "bg-gradient-to-t from-[#7C3AED] to-[#581DBD] ",
    href: "/dashboard/optimizer",
  },
  {
    title: "Learn",
    icon: "/open-book.svg",
    class: "bg-gradient-to-t from-[#10B981] to-[#1C986F] ",
    href: "/dashboard/learn",
  },
];

const PlatformSidebar = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-col gap-5  h-full overflow-y-auto no-scrollbar border-r border-r-stroke px-4 py-5 shrink-0">
        {links.map((link, index) => (
          <SideBarItem link={link} key={index.toString()} />
        ))}
        <div className="flex items-center justify-center w-11 h-11 border border-[#1F1F1F] hover:bg-foreground/5 rounded-xl cursor-pointer">
          <Icons.plus className="text-white w-4 h-4" />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PlatformSidebar;
