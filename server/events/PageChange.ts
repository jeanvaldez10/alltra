import {Events} from '../@types/index'
import core from '../src';

const PageChangeEvent = {
    event: Events.PAGE_CHANGE,

    action: async (data: any, id: string) => {
        console.log(`🔄 PageChangeEvent triggered for user ${id} with data:`, data);
        
        const user = core.users.get(id);
        
        if (user) {
            const oldPath = user.path;
            const oldChannel = user.channel || '';
            
            user.path = data;
            
            // Extract channel ID from path if it's a chat path
            let newChannel = '';
            if (typeof data === 'string' && data.startsWith('/chat/')) {
                newChannel = data.substring('/chat/'.length);
                user.channel = newChannel;
                console.log(`📋 User ${id} channel updated: ${oldChannel} -> ${newChannel}`);
            } else {
                console.log(`📋 User ${id} not in a chat channel, clearing channel property`);
                user.channel = '';
            }
            
            console.log(`📋 User ${id} path updated: ${oldPath} -> ${data}`);
            console.log(`📋 Updated user object:`, {
                path: user.path,
                channel: user.channel
            });
            
            core.users.set(id, user);
        } else {
            console.log(`❌ PageChangeEvent: User ${id} not found in core.users`);
        }
    }
};

export default PageChangeEvent;