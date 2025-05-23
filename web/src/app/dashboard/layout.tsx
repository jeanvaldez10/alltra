
import DashboardSidebarPlatforms from "@/components/dashboard/DashboardSidebarPlatforms"
import SidebarContainer from "@/components/dashboard/SidebarContainer"
import { headers } from "next/headers"
import { User } from "../../../@types"
import Container from "@/components/dashboard/Container"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import { Nav } from "@/components/dashboard/mailbox/nav"
import PlatformSidebar from "@/components/dashboard/platform-sidebar"



import { Nunito } from 'next/font/google';
import { Metadata } from "next"

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['200', '300', '400', '700', '900'],
    style: ['normal', 'italic'],
    variable: '--font-nunito',
});

export const metadata: Metadata = {
    title: "AllTrade Dashboard",
    description: "Trading performance dashboard",
    generator: 'v0.dev'
}


export default async function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const header = await headers();
    const user: User = JSON.parse(header.get("x-user-info") as string)

    return <SidebarContainer>
        <div className="flex flex-col w-full">
            <DashboardHeader user={user} />

            <Container>
                <div className="flex w-full h-full">
                    <PlatformSidebar />

                    <DashboardSidebar />
                    {children}
                </div>

            </Container>
        </div>


    </SidebarContainer>

}