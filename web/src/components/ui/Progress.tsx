import { cn } from "@/lib/utils";

interface ProgressProps {
    value: number;
    className?: string;
}

const Progress = ({ value, className }: ProgressProps) => {
    return (
        <div className="bg-[#101010] h-[26px] rounded-full w-full overflow-hidden">
            <div
                className={cn(
                    "h-full rounded-full transition-[width] duration-500 ease-in-out",
                    className
                )}
                style={{
                    width: `${value}%`,
                }}
            ></div>
        </div>
    );
};

export default Progress;
