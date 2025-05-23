import * as React from "react";
import {
    CheckCircle,
    Info,
    XIcon,
    TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define allowed notification statuses
export type NotificationStatus = "Success" | "Error" | "Info";

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
    status: NotificationStatus;
    message: string;
    onClose?: () => void;
    size?: boolean
}

// Icons based on status
const statusIcons: Record<NotificationStatus, React.ReactNode> = {
    Success: <CheckCircle className="text-[#439F6E] size-5" strokeWidth={2} />,
    Error: <TriangleAlert className="text-[#F93232] size-5" strokeWidth={2} />,
    Info: <Info className="text-[#605DEC] size-5" strokeWidth={2} />,
};

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
    ({ className, status, message, onClose, size = true, children, ...props }, ref) => {
        const align = size ? "items-start" : "items-center"
        return (
            <div
                ref={ref}
                className={cn(
                    `flex ${align} justify-between gap-2.5 p-4 rounded w-full dark:bg-[#171717] bg-white font-geist`,
                    className
                )}
                {...props}
            >
                <div className={`flex ${align} gap-2.5 flex-1 w-full`}>
                    <div>{statusIcons[status]}</div>
                    <div className="flex flex-col items-start gap-1.5 w-full">
                        {size && <span className="text-lg leading-[120%] dark:text-white text-[#110F0F] font-semibold">
                            {status} notification
                        </span>}
                        <span className="dark:text-white text-[#110F0F] font-normal text-base leading-[22px]">
                            {message}
                        </span>
                        {children}
                    </div>
                </div>
                <span
                    onClick={onClose}
                    className="cursor-pointer text-[#848484] dark:text-[#C9C8D3] hover:opacity-80 transition"
                    aria-label="Close"
                >
                    <XIcon size={16} strokeWidth={2} />
                </span>
            </div>
        );
    }
);
// Assign a display name for debugging/dev tools

Notification.displayName = "Notification";
export { Notification };
