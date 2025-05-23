import ChatContent from "@/components/chat/ChatContent";
import MembersList from "@/components/chat/MembersList";
import prisma from "@/lib/prisma";
import { Channel, Message, User } from "../../../../@types";
import getUser from "@/components/global/getUser";

const page = async ({ params }: { params: Promise<{ id?: string }> }) => {
    const { id } = await params

    // get the current user information using "x-user-info" header.
    const user = await getUser();

    // Get channel by id from prisma
    const channel = await prisma.channel.findUnique({ where: { id } });

    // Get Messages by channel id (get a channel messages)
    const messages = await prisma.message.findMany({ where: { channel: id } });

    // fetch every user info by messages and update messages
    const updates_messages = await Promise.all(messages.map(async (message) => {
        const user = await prisma.user.findUnique({ where: { id: message.by } });

        const updated_user = { ...user, password: "" }
        return { ...message, by: updated_user }
    }))

    return (<div className="flex h-full  w-full">
        <div className="w-full h-full  ">
            <ChatContent user={user as User} channel={channel as Channel} first_messages={updates_messages as Message[]} />
        </div>
        <MembersList user={user as User} />
    </div>
    )
}

export default page;