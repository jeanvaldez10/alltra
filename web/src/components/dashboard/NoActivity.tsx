import { cn } from "@/lib/utils"
import { Ellipsis } from "lucide-react"
import Link from "next/link"

interface NoActivityProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    content: string,
    links: {
        text: string,
        href: string
    }[]
}

const NoActivity = ({
    className,
    title,
    content,
    links,
    ...props }: NoActivityProps) => {
    return (
        <div
            className={cn("bg-[#0D0D0D] flex flex-col py-[23px] px-[19px] relative rounded-[14px] shadow-[0px_4px_4px_0px_#00000040] w-full", className)}
            {...props}>
            <div className="flex items-center justify-between w-full">
                <span className="text-white font-medium font-geist text-base">
                    {title}
                </span>
                <span className="cursor-pointer flex items-center justify-center">
                    <Ellipsis color="#3C3C3C" size={16} />
                </span>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <span className="text-xs font-medium font-geist text-center text-white">
                    {content}
                </span>
                <div className="flex items-center justify-center gap-1 w-full">
                    {links.map((link, index) => (
                        <div key={index} className="flex gap-1 items-center justify-center">
                            <Link key={index} href={link.href} className="text-[#0066FF] font-medium font-geist text-xs text-center">
                                {link.text}
                            </Link>
                            {index < links.length - 1 && (
                                <span className="text-white font-medium font-geist text-xs">or</span>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default NoActivity