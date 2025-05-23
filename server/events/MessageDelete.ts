import { Events } from '../@types/index'
import prisma from '../lib/prisma';
import core from '../src';

const MessageDelete = {
    event: Events.MESSAGE_DELETE,
    action: async (data: { id: string }) => {
        // delete the message from the database
        const message = await prisma.message.delete({ where: { id: data.id } });

        // send the deleted message to all users in the channel
        core.users.forEach((u) => {
            if (u.path.split("/chat/").join("") !== message.channel) return;
            u.socket.send(JSON.stringify({
                e: Events.MESSAGE_DELETE,
                d: { id: data.id }
            }));
        });
    }
}

export default MessageDelete;