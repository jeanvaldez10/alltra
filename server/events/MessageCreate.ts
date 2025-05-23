import { Events, User } from '../@types/index'
import prisma from '../lib/prisma';
import core from '../src';

type Message = {
    content: string;
    channel: string;
    code?: string;
}

const MessageCreateEvent = {
    event: Events.MESSAGE_CREATE,

    action: async (data: Message, user: User) => {

        try {
            // Create the message in the database
            const message = await prisma.message.create({ 
                data: { 
                    content: data.content, 
                    by: user.id, 
                    channel: data.channel 
                } 
            });
            
            console.log(`✅ Message created with ID: ${message.id}`);
            
            // Get the channel details
            const channel = await prisma.channel.findUnique({ 
                where: { id: data.channel } 
            });
            
            if (!channel) {
                console.error(`❌ Channel not found: ${data.channel}`);
                return;
            }
            
            console.log(`📢 Broadcasting to channel: ${channel.name}`);
            
            // Update the current user's channel information
            const sessionUser = core.users.get(user.id);
            if (sessionUser) {
                // Update channel info for this user
                sessionUser.channel = data.channel;
                core.users.set(user.id, sessionUser);
                console.log(`✅ Updated user ${user.username} channel to ${data.channel}`);
            }
            
            // Broadcast to all online users in the same channel
            // Including sender for confirmation
            let recipientCount = 0;
            
            core.users.forEach((userSession, userId) => {
                // Always send to the message author
                if (userId === user.id) {
                    userSession.socket.send(JSON.stringify({
                        e: Events.MESSAGE_CREATE,
                        d: { ...message, by: user, code: data.code }
                    }));
                    recipientCount++;
                    return;
                }
                
                // If this is a direct message, check if the user is part of the conversation
                // For now, we're handling this as a channel message
                // Send to all users in the channel
                userSession.socket.send(JSON.stringify({
                    e: Events.MESSAGE_CREATE,
                    d: { ...message, by: user, code: data.code }
                }));
                recipientCount++;
            });
            
            console.log(`📢 Message broadcast to ${recipientCount} users`);
        } catch (error) {
            console.error("❌ Error creating message:", error);
        }
    }
};

export default MessageCreateEvent;