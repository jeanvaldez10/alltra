import { Events, User } from '../@types/index'
import prisma from '../lib/prisma';
import core from '../src';

type Message = {
    content: string;
    channel: string;
}

const DirectMessageCreateEvent = {
    event: Events.DIRECT_MESSAGE_CREATE,

    action: async (data: any, user: User) => {
        const recieved_message: Message = data;

        const message = await prisma.message.create({ data: { content: recieved_message.content, by: user.id, channel: recieved_message.channel } });

        const direct = await prisma.direct.findUnique({ where: { id: recieved_message.channel } });
        const author = direct?.members.filter((member) => member !== user.id)[0];

        core.users.forEach((_user, key) => {
            if (key == author || key == user.id) {
                _user.socket.send(JSON.stringify(
                    {
                        e: Events.DIRECT_MESSAGE_CREATE,
                        d: { ...message, by: user }
                    }
                ))
            }
        })
    }
};

export default DirectMessageCreateEvent;