import { WebSocket, WebSocketServer } from 'ws';


// chat core class
export default class Chat {

    constructor(socket: WebSocketServer, users: Map<string, {
        socket: WebSocket;
        path: string;
        channel?: string;
    }> ) {
        
    }
}