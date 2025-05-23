import { cn } from "@/lib/utils";

interface AddWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    onClick?: () => void;
}
const AddWidget = ({ className, onClick, ...props }: AddWidgetProps) => {
    return (
        <div
            className={cn("bg-[#0D0D0D] border border-dashed border-[#272727] flex flex-col items-center justify-center rounded-[14px] shadow-[0px_4px_4px_0px_#00000040] h-[308px] w-full", className)}
            {...props}>
            <span className="font-medium text-xs font-geist tracking-[-1.9%] text-[#303030] hover:text-[#8a8787] transition-colors duration-200 text-center cursor-pointer select-none" onClick={onClick}>
                Click to add
            </span>
        </div>
    )
}

export default AddWidget