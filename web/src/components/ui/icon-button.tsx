import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Bookmark, Check, ChevronLeft, ChevronRight, Download, Plus, SquarePen, X } from "lucide-react";
import * as React from "react"
// Define accepted icon types
export type IconButtonType =
    | "arrow-left"
    | "arrow-right"
    | "plus"
    | "checkmark"
    | "x"
    | "download"
    | "bookmark"
    | "edit";

interface IconButtonProps {
    type: IconButtonType;
    onClick?: () => void;
    clasaName?: string
}
// Mapping icon types to Lucide icons
const iconMap: Record<IconButtonType, React.ElementType> = {
    "arrow-left": ChevronLeft,
    "arrow-right": ChevronRight,
    "plus": Plus,
    "checkmark": Check,
    "x": X,
    "download": Download,
    "bookmark": Bookmark,
    "edit": SquarePen,
};
const IconButton = ({ type, onClick, clasaName }: IconButtonProps) => {
    const Icon = iconMap[type];
    return (
        <button
            onClick={onClick}
            className={cn("inline-flex items-center justify-center rounded-full w-[55px] h-[55px] bg-[#0066FF] hover:bg-[#0066FF]/90 transition-colors",
                clasaName
            )}
        >
            <Icon className="size-8" />
        </button>
    )
}

export default IconButton