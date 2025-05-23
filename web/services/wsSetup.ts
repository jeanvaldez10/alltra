// /services/websocketService.ts

interface WebSocketService {
    socket: WebSocket | null;
    connect: (url: string, channel?: string) => void;
    sendMessage: (message: string) => void;
    close: () => void;
    onMessage: (callback: (message: string) => void) => void;
}

const WebSocketService: WebSocketService = {
    socket: null,

    connect: (url: string, channel) => {
        // Create WebSocket instance without manually passing the token
        const socket = new WebSocket(url);

        // Store the WebSocket instance
        WebSocketService.socket = socket;

        // Log successful connection
        socket.onopen = (e) => {
            console.log('WebSocket connected');
        };

        // Log errors
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Handle socket close
        socket.onclose = () => {
            console.log('WebSocket closed');
        };
    },

    sendMessage: (message: string) => {
        if (WebSocketService.socket && WebSocketService.socket.readyState === WebSocket.OPEN) {
            WebSocketService.socket.send(message);
        } else {
            console.warn('WebSocket is not open');
        }
    },

    close: () => {
        if (WebSocketService.socket) {
            WebSocketService.socket.close();
            WebSocketService.socket = null;
        }
    },

    onMessage: (callback: (message: string) => void) => {
        if (WebSocketService.socket) {
            WebSocketService.socket.onmessage = (event) => {
                callback(event.data);
            };
        } else {
            console.warn('WebSocket is not connected');
        }
    }
};

export default WebSocketService;
