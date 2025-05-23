import getUser from "@/components/global/getUser"
import Navbar from "@/components/global/navbar"

export default async function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUser();

    return <div>
        <Navbar isLoggedIn={!!user}/>
        <div className="max-w-5xl mx-auto p-4">
            {children}
        </div>
    </div>
}