"use client"
import React, { useState } from 'react'
import { Hash, PlusIcon } from 'lucide-react'
import { Category, Channel, Roles, User } from '../../../@types'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { Constants } from '../../../client/constants'
import { usePathname } from 'next/navigation'

const ChatSidebarChannels: React.FC<{ channels: Channel[], categories: Category[], user: User }> = ({ channels, categories, user }) => {
    const [data, setData] = useState<{ name: string, category_id: string }>(
        {
            name: "",
            category_id: ""
        }
    )

    const pathname = usePathname();


    const CreateChannel = async () => {
    
        if (!data.name || !data.category_id) return;
        
        try {
            const response = await axios.post(`${Constants.API_BASE}/chat/channel/create`, data, {withCredentials: true});
            if (response.data.code == 201) {
                console.log(response.data)
            }
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <div className='custom-scrollbar h-full  overflow-y-auto w-full max-w-[300px] backdrop-blur-2xl  border-r pt-4 px-3 bg-neutral-950'>
            <div className='flex flex-col gap-4 '>
                <div className='flex flex-col'>
                    {
                        categories.map((category, i) => {
                            return (
                                <div key={i} className='flex flex-col gap-3'>
                                    <div className='flex items-center justify-between'>
                                        <h1 className='text-neutral-400 uppercase text-sm font-bold'>{category.name}</h1>
                                       {[Roles.ADMIN, Roles.OWNER, Roles.DEVELOPER].some(role => user.roles.includes(role)) && <Dialog >
                                            <DialogTrigger asChild>
                                                <PlusIcon className='size-4 cursor-pointer hover:rotate-360 duration-200 text-neutral-400' />
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Create a new channel</DialogTitle>
                                                    <DialogDescription>
                                                        Channels are where your team communicates.
                                                    </DialogDescription>
                                                </DialogHeader>
                                            
                                                    <div className="grid gap-4 py-4">
                                                        <div className=" flex flex-col grid-cols-4  gap-4">
                                                            <Label htmlFor="name" className="">
                                                                Category
                                                            </Label>
                                                            <Select required onValueChange={(e) => { setData((prev) => ({ ...prev, category_id: e })) }}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select a Category" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        {categories.map((category, i) => {
                                                                            return <SelectItem key={i} value={category.id}>{category.name}</SelectItem>
                                                                        })}
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className=" flex flex-col grid-cols-4  gap-4">
                                                            <Label htmlFor="name" className="">
                                                                Name
                                                            </Label>
                                                            <Input
                                                                id="name"
                                                                value={data.name}
                                                                onChange={(e) => {
                                                                    setData((prev) => (
                                                                        { ...prev, name: e.target.value }
                                                                    ))
                                                                }}
                                                                autoFocus
                                                                className="col-span-3"
                                                                required
                                                            />
                                                        </div>

                                                    </div>
                                         

                                                <DialogFooter className='flex'>
                                                    <div className='flex justify-between w-full'>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogTrigger>
                                                        <Button type="submit" onClick={CreateChannel}>Create</Button>
                                                    </div>

                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>}
                                        

                                    </div>

                                    <div className='flex flex-col gap-3'>
                                        {category.channels.map((_channel, i) => {
                                            const channel = channels.find(channel => channel.id === _channel)
                                            return (
                                                <Link key={i} href={`/chat/${channel?.id}`}><div key={i} className={`${pathname.includes(channel?.id as string) && " bg-zinc-800"}  flex items-center gap-1 w-full hover:bg-zinc-800 py-2 px-2 rounded-lg cursor-pointer select-none`}>
                                                    <Hash />
                                                    <div className='flex w-full justify-between items-center'>
                                                        <h1 className='text-md'>{channel?.name}</h1>
                                                        {/*channel.drop_down && <ChevronDown className='size-5' />*/}
                                                    </div>
                                                </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatSidebarChannels