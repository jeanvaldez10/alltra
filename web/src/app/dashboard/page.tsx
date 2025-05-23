import CalendarComponent from "@/components/dashboard/home/Calendar";
import ParentComponent from "@/components/dashboard/home/ParentTabsMaytradeOverview";
import RecentActivity from "@/components/dashboard/home/RecentActivity";
import RecentMessages from "@/components/dashboard/home/RecentMessages";
import ChartTrading from "@/components/dashboard/TradingChart";
import ItemHoverIcon from "@/components/global/ItemHoverIcon";

const itemsActivity = [
    {
        icon: "/dashboard.svg",
        name: "Dashboard",
        color: "bg-gradient-to-t from-[#0c30b3] to-blue-600"

    },
    {
        icon: "/journal.svg",
        name: "Journal",
        color: "bg-gradient-to-t from-[#ff8900] to-orange-600"

    },
    {
        icon: "/graph.svg",
        name: "Statistics",
        color: "bg-gradient-to-t from-[#a83aff] to-purple-500 "

    },
    {
        icon: "/tracker.svg",
        name: "Trackers",
        color: "bg-gradient-to-t from-[#d93462] to-pink-600 "

    },
    {
        icon: "/tools.svg",
        name: "Tools",
        color: "bg-gradient-to-t from-[#485de0] to-blue-600"
    },
    {
        icon: "/knight.svg",
        name: "Strategies",
        color: "bg-gradient-to-t from-red-500 to-red-600"
    }
]

const Page = () => {

    return (
        <div className="h-full bg-background w-full p-4 overflow-y-auto custom-scrollbar">

            <div className="flex  rounded-3xl flex-col gap-2 mt-4">
                <div className="flex justify-between gap-12 items-center w-full  px-4">
                    <p className="w-1/2 text-neutral-400">Your recent activity</p>
                    <p className="w-1/2 text-neutral-400">Recent Messages</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                    <RecentActivity />
                    <RecentMessages />
                </div>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4   rounded-3xl">
                <div className="h-full">

                    <div className="w-full h-full bg-neutral-900/40 rounded-3xl">
                        <CalendarComponent />

                    </div>
                </div>


                <div className="h-full">

                    <div className="w-full h-full bg-neutral-900/40 rounded-3xl">
                    </div>
                </div>
                <div className="h-full">

                    <div className="w-full h-full bg-neutral-900/40 rounded-3xl p-4">
                        <ParentComponent />
                        <div className="bg-neutral-900/50 p-4 mt-4 rounded-xl [&:hover.goto]:flex">
                            <div className="bg-sky-400 rounded-full size-3 animate-pulse"></div>
                            <h1 className="mt-1">New York Live Trading Session</h1>
                            <p className="text-neutral-400 text-sm">Live trading currently happening in <span className="text-white">Maychat Live Trading</span></p>
                            <div className="mt-2 flex justify-between items-center" >
                                <p className="bg-neutral-900 rounded-full px-2 py-1 w-max text-xs">Ends in <span className="text-blue-400">54 Minutes</span></p>
                                <p className="goto text-neutral-400 text-sm hover:text-neutral-200 duration-100">Go to</p>
                            </div>
                        </div>
                        <div className="bg-neutral-900/50 rounded-xl py-2 px-2 flex items-center gap-6 mt-4">
                            <div className="px-3 py-1 rounded-lg bg-neutral-800/50">
                                <p className="text-sm font-semibold">Active</p>
                            </div>
                            <div>
                                <p className="text-sm  text-neutral-400">Upcoming</p>
                            </div>

                        </div>
                        <div className="p-2 flex items-center gap-4 bg-[#5271ff]/20 rounded-xl mt-4">
                            <img src="/newyork.svg" className="size-12 object-fill bg-black/30 rounded-2xl" />
                            <div>
                                <h1 className="text-xs">New York Live Trading Session</h1>
                                <p className="text-xs text-neutral-400">Happening now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Page;
