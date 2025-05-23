import BlogNavigation from "@/components/blogs/BlogNavigation"

export default async function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {


    return <div className="flex gap-3 mt-32">
        {children}
        <BlogNavigation />
    </div>

}