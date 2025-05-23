"use client"
import { Search, SearchIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { User } from '../../../@types'
import UserProfile from './UserProfile'
import { Input } from '../ui/input'
import { ThemeToggle } from '../ThemeToggle'
import DateRangePicker from '../widgets/DateRangePicker'

const items_data = [
    {
        name: "Dashboard",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path d="M2 4.25A2.25 2.25 0 0 1 4.25 2h2.5A2.25 2.25 0 0 1 9 4.25v2.5A2.25 2.25 0 0 1 6.75 9h-2.5A2.25 2.25 0 0 1 2 6.75v-2.5ZM2 13.25A2.25 2.25 0 0 1 4.25 11h2.5A2.25 2.25 0 0 1 9 13.25v2.5A2.25 2.25 0 0 1 6.75 18h-2.5A2.25 2.25 0 0 1 2 15.75v-2.5ZM11 4.25A2.25 2.25 0 0 1 13.25 2h2.5A2.25 2.25 0 0 1 18 4.25v2.5A2.25 2.25 0 0 1 15.75 9h-2.5A2.25 2.25 0 0 1 11 6.75v-2.5ZM15.25 11.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
        </svg>
        ,
        active: true

    },
    {
        name: "Performance",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
        </svg>,
        active: false
    },
    {
        name: 'History',
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path d="M3.75 3A1.75 1.75 0 0 0 2 4.75v3.26a3.235 3.235 0 0 1 1.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0 0 16.25 5h-4.836a.25.25 0 0 1-.177-.073L9.823 3.513A1.75 1.75 0 0 0 8.586 3H3.75ZM3.75 9A1.75 1.75 0 0 0 2 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 15.25v-4.5A1.75 1.75 0 0 0 16.25 9H3.75Z" />
        </svg>,
        active: false
    },
    {
        name: "System",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path d="M14 6H6v8h8V6Z" />
            <path fillRule="evenodd" d="M9.25 3V1.75a.75.75 0 0 1 1.5 0V3h1.5V1.75a.75.75 0 0 1 1.5 0V3h.5A2.75 2.75 0 0 1 17 5.75v.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v.5A2.75 2.75 0 0 1 14.25 17h-.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-.5A2.75 2.75 0 0 1 3 14.25v-.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-.5A2.75 2.75 0 0 1 5.75 3h.5V1.75a.75.75 0 0 1 1.5 0V3h1.5ZM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5Z" clipRule="evenodd" />
        </svg>,
        active: false
    },
    {
        name: "MayChat",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 0 1-5.183.501.78.78 0 0 0-.528.224l-3.579 3.58A.75.75 0 0 1 6 17.25v-3.443a41.033 41.033 0 0 1-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902Z" clipRule="evenodd" />
        </svg>,
        active: false
    }
]

const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "Good morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good afternoon";
    } else if (hour >= 17 && hour < 21) {
        return "Good evening";
    } else {
        return "Good night";
    }
};


const DashboardHeader: React.FC<{ user: User | null }> = ({ user }) => {
    const [BoardsItems, setBoardsItems] = useState(items_data);
    const [currentBoard, setCurrentBoard] = useState<number>(0);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
        setBoardsItems((prev) =>
            prev.map((item, index) => ({
                ...item,
                active: index === currentBoard, // Only the selected board is active
            }))
        );
    }, [currentBoard]);

    return (
        <div className='h-16  px-2 flex bg-background border-b border-neutral-800'>
            <div className='w-full  items-center h-12 flex justify-between my-auto'>
                <h1 className='text-lg text-neutral-400 ml-4 min-w-44'>
                    {getGreeting()}, <span className='text-white'>{user ? user.full_name.split(" ")[0] : "Guest"}</span>!
                </h1>

                <div className='flex gap-3 items-center ml-4'>
                    <div
                        onClick={() => !isSearch && setIsSearch(true)}
                        className='gap-2 hover:bg-neutral-800 [&:hover>*]:text-white cursor-pointer bg-neutral-900 p-2.5 flex justify-center items-center rounded-2xl transition-all duration-300 ease-in-out'
                    >
                        <Search className='size-5' onClick={() => {
                            if (isSearch)
                                setIsSearch(false)
                        }} />

                        {isSearch && (
                            <input
                                className="bg-transparent text-sm  !border-0 focus:!border-0 focus-visible:!border-0 ring-0 focus:ring-0 focus-visible:ring-0 outline-none focus:outline-none focus-visible:outline-none text-neutral-400 placeholder-neutral-400 transform transition-all duration-300 ease-in-out translate-x-0 opacity-100"
                                placeholder="Searching..."
                                onFocus={() => { setIsFocused(true) }}

                            />
                        )}
                        {
                            isFocused &&
                            <div></div>
                        }
                    </div>

                    <DateRangePicker
                        numberOfMonths={1}
                        indicators={[
                            new Date(2025, 3, 5), // April 5, 2025
                            new Date(2025, 3, 10), // April 10, 2025
                            new Date(2025, 3, 15) // April 15, 2025
                        ]}
                        indicatorClassName="bg-red-500/50 rounded-2"
                        onDateRangeChange={(range) => console.log(range)}
                    />
                    <ThemeToggle />
                    <div className='hover:bg-neutral-800 [&:hover>*]:text-white cursor-pointer bg-neutral-900 size-10  flex justify-center items-center rounded-2xl'>
                        <svg viewBox="0 0 24 24" fill="currentColor" className='size-5 ' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.35179 20.2418C9.19288 21.311 10.5142 22 12 22C13.4858 22 14.8071 21.311 15.6482 20.2418C13.2264 20.57 10.7736 20.57 8.35179 20.2418Z" fill="currentColor"></path> <path d="M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.27256 2 12 2C15.7274 2 18.7491 5.13401 18.7491 9Z" fill="currentColor"></path> </g></svg>
                    </div>
                    <div className='hover:bg-neutral-800 bg-neutral-900 [&:hover>*]:text-white  cursor-pointer duration-75 size-10  flex justify-center items-center rounded-2xl'>
                        <svg className='size-5 ' viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.4277 2C11.3139 2 10.2995 2.6007 8.27081 3.80211L7.58466 4.20846C5.55594 5.40987 4.54158 6.01057 3.98466 7C3.42773 7.98943 3.42773 9.19084 3.42773 11.5937V12.4063C3.42773 14.8092 3.42773 16.0106 3.98466 17C4.54158 17.9894 5.55594 18.5901 7.58466 19.7915L8.27081 20.1979C10.2995 21.3993 11.3139 22 12.4277 22C13.5416 22 14.5559 21.3993 16.5847 20.1979L17.2708 19.7915C19.2995 18.5901 20.3139 17.9894 20.8708 17C21.4277 16.0106 21.4277 14.8092 21.4277 12.4063V11.5937C21.4277 9.19084 21.4277 7.98943 20.8708 7C20.3139 6.01057 19.2995 5.40987 17.2708 4.20846L16.5847 3.80211C14.5559 2.6007 13.5416 2 12.4277 2ZM8.67773 12C8.67773 9.92893 10.3567 8.25 12.4277 8.25C14.4988 8.25 16.1777 9.92893 16.1777 12C16.1777 14.0711 14.4988 15.75 12.4277 15.75C10.3567 15.75 8.67773 14.0711 8.67773 12Z" fill="currentColor"></path> </g></svg>


                    </div>
                    <UserProfile user={user as User} />
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader