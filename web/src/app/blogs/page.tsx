import BlogsFirstSection from "@/components/blogs/BlogsIndexSection"
import PostsSectionBlog from "@/components/blogs/PostsSection"
import { Separator } from "@/components/ui/separator"

const page = () => {
  return (
    <div>
      <BlogsFirstSection />
      <Separator className="my-10" />
      <PostsSectionBlog />
    </div>
  )
}

export default page;