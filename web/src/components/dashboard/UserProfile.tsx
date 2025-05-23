"use client";

import React, { useEffect, useState } from "react";
import {
    ChevronDown,
    CreditCard,
    LifeBuoy,
    LogOut,
    Settings,
    User,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserType } from "../../../@types/index";
import Auth from "../../../client/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
const auth = new Auth();

const UserProfile: React.FC<{ user: UserType | null }> = ({ user }) => {
    const [UserProfileWidth, setUserProfileWidth] = useState<number>(0);
    useEffect(() => {
        const userProfile = document.getElementById("user-profile-dropdown")
        if (userProfile) {
            console.log(userProfile.clientWidth)
            setUserProfileWidth(userProfile.clientWidth)
        }
    }, []);

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div id="user-profile-dropdown" className='cursor-pointer min-w-44 gap-2 h-11 bg-neutral-900 hover:bg-neutral-800  flex justify-center items-center rounded-2xl px-2'>
                <Avatar className='size-8'>
                    <AvatarImage src={""} className='rounded-full'></AvatarImage>
                    <AvatarFallback className='rounded-full text-sm size-8'>
                        {user ? user.full_name.split(" ")[0][0] + user.full_name.split(" ")[1][0] : "NA"}
                    </AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                    <h1 className='text-xs'>{user ? user.full_name : "Guest"}</h1>
                    <span className='text-neutral-500 text-[10px]'>{user ? user.username : "Unknown"}</span>
                </div>
                <button><ChevronDown className='size-4 mx-2 text-neutral-500' /></button>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent style={{ width: `${UserProfileWidth}px` }}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreditCard />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <Link href="/settings">
                    <DropdownMenuItem>
                        <Settings />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuItem>
                    <LifeBuoy />
                    <span>Support</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-b-xl text-red-600" onClick={() => { auth.logout(); redirect("/login") }}>
                <LogOut />
                <span>Log out</span>
                <DropdownMenuShortcut className="text-white">⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default UserProfile;