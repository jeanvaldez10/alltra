import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import cookie from 'cookie';
import { authenticate } from '../src/utils';
import { IncomingMessageWithToken } from '../@types/index';
export const onlineUsers = new Map<string, { socket: WebSocket, path: string, channel?: string }>();
require("dotenv").config()


export async function verifyClient(info: { origin: string, secure: boolean, req: http.IncomingMessage }, callback: (result: boolean, code?: number, message?: string) => void) {
    const allowedOrigins = [`http://${process.env.ORIGIN_IP}`,  'http://localhost']; // Allow this origin only

    if (!allowedOrigins.includes(info.origin)) {
        console.log(`Connection rejected from ${info.origin}`);
        callback(false, 403, 'Invalid origin');
        return;
    }

    const cookies = cookie.parse(info.req.headers.cookie || '');
    const token = cookies['access_token'];
    
    if (!token) {
        console.log('Token missing');
        callback(false, 401, 'Token missing');
        return;
    }

    const user = await authenticate(token);
    if (!user.isValid) {
        console.log('Authentication failed');
        callback(false, 403, 'Authentication failed');
        return;
    }

    console.log('Authentication successful');
    (info.req as IncomingMessageWithToken).token = token;
    callback(true);
}
