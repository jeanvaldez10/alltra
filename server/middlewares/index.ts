import { Request, Response, NextFunction } from "express"
import core from "../src/index";
import prisma from "../lib/prisma";
import { HttpStatus } from "../@types";
import { useParams } from "../lib/process-folder";

export async function isUserOnline(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    const params = useParams(req);
    const {id} = params;

    console.log(`Request params ID: ${id}`);
    console.log(`Current user: ${user.id}, ${user.full_name}`);

    const _channel = await prisma.channel.findUnique({ where: { id } });

    if (!_channel) {
        console.log(`Channel not found with ID: ${id}`);
        return res.json({ code: HttpStatus.NOT_FOUND, message: `ID: ${id}, Channel not found.` }).status(HttpStatus.NOT_FOUND);
    }
    
    console.log(`Found channel: ${_channel.name} (${_channel.id})`);

    const is_online = core.users.get(user.id);
    
    if (!is_online) {
        console.log(`User ${user.full_name} is not online in core.users`);
        return res.json({ code: HttpStatus.NOT_ACCEPTABLE, message: `User ${user.full_name} is not online` }).status(HttpStatus.NOT_ACCEPTABLE);
    }
    
    // Log complete user session info
    console.log("User session data:", {
        userId: user.id,
        userPath: is_online.path,
        userChannel: is_online.channel,
        requestedChannelId: _channel.id,
        pathMatch: is_online.path?.includes(_channel.id),
        channelMatch: is_online.channel === _channel.id
    });
    
    // More forgiving check - try to match either the whole ID or the last part
    const pathContainsId = is_online.path?.includes(_channel.id);
    
    const pathEndsWithId = is_online.path?.endsWith(_channel.id);
    
    // Extract channel ID from path
    let pathChannelId = '';
    if (is_online.path?.startsWith('/chat/')) {
        pathChannelId = is_online.path.substring('/chat/'.length);
    }
    
    console.log("Path analysis:", {
        path: is_online.path,
        channelId: _channel.id,
        pathContainsId,
        pathEndsWithId,
        extractedChannelId: pathChannelId
    });
    
    // Check if the user's session channel matches OR any path check succeeds
    if (
        is_online.channel === _channel.id || 
        pathContainsId || 
        pathEndsWithId || 
        pathChannelId === _channel.id
    ) {
        console.log(`✅ Access granted to channel: ${_channel.name}`);
        req.channel = _channel;
        next();
        return;
    }
    
    console.log(`❌ Access denied: user channel=${is_online.channel}, path=${is_online.path}, requested channel=${_channel.id}`);
    return res.json({ 
        code: HttpStatus.UNAUTHORIZED, 
        message: `You cannot send message in ${_channel.name}` 
    }).status(HttpStatus.UNAUTHORIZED);
}