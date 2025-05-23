"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, Ellipsis, ThumbsDown, ThumbsUp } from "lucide-react"

type ReviewType = "Good decision" | "Bad decision" | "Checklist" | "Good outcome";

interface itemProps extends React.HTMLAttributes<HTMLDivElement> {
    review: ReviewType,
}

const TradeReviewItem = React.forwardRef<HTMLDivElement, itemProps>(
    ({ review, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className="flex items-center gap-5"
                {...props}
            >
                <span className={cn("flex items-center justify-center rounded-full w-[30px] h-[30px] p-[7px]", className)}>
                    {children}
                </span>
                <span className="text-white font-geist font-normal text-2xl">
                    {review}
                </span>
            </div>
        )
    }
)

const TradeReview = () => {
    return (
        <div className="bg-[#070707] flex flex-col gap-5 p-10 rounded-lg w-full">
            <div className="flex items-center justify-between w-full">
                <span className="text-[#777777] font-medium font-geist text-xl">
                    Execute Quality
                </span>
                <span className="cursor-pointer flex items-center justify-center">
                    <Ellipsis color="#4A4949" />
                </span>
            </div>
            <TradeReviewItem review="Good decision" className="bg-[#0DE983]">
                <ThumbsUp fill="#fff" />
            </TradeReviewItem>
            <TradeReviewItem review="Bad decision" className="bg-[#DF2C2C]">
                <ThumbsDown fill="#fff" />
            </TradeReviewItem>
            <TradeReviewItem review="Good outcome" className="bg-[#FE8C07]">
                <Check strokeWidth={2.5} />
            </TradeReviewItem>
            <TradeReviewItem review="Checklist" className="bg-[#0066FF]">
                <Check strokeWidth={2.5} />
            </TradeReviewItem>
        </div>
    )
}

export default TradeReview