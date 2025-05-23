import DashboardSidebarPlatforms from "@/components/dashboard/DashboardSidebarPlatforms"
import SidebarContainer from "@/components/dashboard/SidebarContainer"
import ChatSidebarChannels from "@/components/chat/ChatSidebarChannels"
import prisma from "@/lib/prisma"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import getUser from "@/components/global/getUser"
import { User } from "../../../@types"

export default async function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUser();
    const channels = await prisma.channel.findMany();
    const categories = await prisma.category.findMany();


    return <div className=" ">
        <SidebarContainer>

            <div className="h-screen w-full">
                <DashboardHeader user={user as User} />

                <div className="  h-[calc(100vh-64px)] flex  w-full">
                    <DashboardSidebarPlatforms />

                    <ChatSidebarChannels user={user as User} channels={channels} categories={categories} />
                    {children}


                </div>
            </div>
        </SidebarContainer>
    </div>
}