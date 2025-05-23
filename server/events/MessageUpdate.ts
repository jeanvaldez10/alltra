import { Events, User } from "../@types/index";
import prisma from "../lib/prisma";
import core from "../src";

/**
 * Request:
 * data: {
 * id: string,
 * content: string
 * }
 */

const MessageUpdate = {
    event: Events.MESSAGE_UPDATE,
    action: async (data: { id: string, content: string }, user: User) => {
        // middleware to check if the user is the author of the message and the content is different
        const message = await prisma.message.findFirst({ where: { id: data.id } });
        if (message.by !== user.id) return;
        if (message.content === data.content) return;

        // update the message in the database
        await prisma.message.update({ where: { id: data.id }, data: { content: data.content } });

        // send the updated message to all users in the channel
        core.users.forEach((u) => {
            if (u.path.split("/chat/").join("") !== message.channel) return;
            u.socket.send(JSON.stringify({
                e: Events.MESSAGE_UPDATE,
                d: { id: data.id, content: data.content }
            }));
        });
    }
}

export default MessageUpdate;