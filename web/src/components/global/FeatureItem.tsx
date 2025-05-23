"use client"

import * as React from "react";
import { cn } from "@/lib/utils"

interface FeatureItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    isSelected: boolean,
    title: string,
    icon: React.ReactNode;
}

const FeatureItem = React.forwardRef<HTMLDivElement, FeatureItemProps>(
    ({ className, isSelected, title, icon, children, ...props }, ref) => {
        return (
            <div
                className={cn("cursor-pointer py-2.5 px-5 flex items-center gap-5 rounded-xl", isSelected ? "bg-[#212121]" : "hover:bg-[#171717]")}
                ref={ref}
                {...props}
            >
                <span className={cn("w-[38px] h-[38px] flex items-center justify-center rounded-[8px]", className)}>
                    {icon}
                </span>
                <span className="capitalize text-white font-medium text-xs font-geist">
                    {title}
                </span>
            </div>
        )
    }
)

export default FeatureItem