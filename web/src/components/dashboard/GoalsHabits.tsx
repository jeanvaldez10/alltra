import { Ellipsis } from "lucide-react";
import Progress from "../ui/Progress"

interface GoalsHabitsProps {
    icon: React.ReactNode;
    title: string;
    firstWeeklyGoalPercentage: number;
    tradingHabitsPercentage: number;
}

const GoalsHabits = ({
    title,
    firstWeeklyGoalPercentage,
    tradingHabitsPercentage,
    icon }: GoalsHabitsProps) => {
    return (
        <div className="bg-[#070707] rounded-lg p-10 flex flex-col gap-5 w-full">
            <div className="flex items-center justify-between w-full">
                <span className="text-[#777777] font-medium font-geist text-[20px]">
                    Rolling PnL
                </span>
                <Ellipsis color="#4A4949" />
            </div>
            <div className="flex flex-col gap-2.5 w-full">
                <div className="flex items-center justify-between w-full">
                    <span className="text-white font-medium font-geist text-[18px]">
                        Weekly Goal
                    </span>
                    <span className="text-white font-medium font-geist text-[18px]">
                        {firstWeeklyGoalPercentage}%
                    </span>
                </div>
                <Progress value={firstWeeklyGoalPercentage} className="bg-[#0DE983]" />
            </div>
            <div className="flex flex-col gap-2.5 w-full">
                <div className="flex items-center justify-between w-full">
                    <span className="text-white font-medium font-geist text-[18px]">
                        Trading Habits
                    </span>
                    <span className="text-white font-medium font-geist text-[18px]">
                        {tradingHabitsPercentage}%
                    </span>
                </div>
                <Progress value={tradingHabitsPercentage} className="bg-[#FE8C07]" />
            </div>
            <div className="flex items-center gap-2.5 bg-[#0D0D0D] rounded-[14px] px-5 py-[19px]">
                <span className="h-[15px] w-3 flex items-center justify-center">
                    {icon}
                </span>
                <span className="font-medium font-geist text-xs text-white">
                    {title}
                </span>
            </div>
        </div>
    )
}

export default GoalsHabits