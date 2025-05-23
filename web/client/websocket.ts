import { create } from "zustand";

type WebSocketState = {
  socket: WebSocket | null;
  set: (socket: WebSocket) => void;
};

export const useWebSocketStore = create<WebSocketState>((set) => ({
  socket: null,
  set: (ws: WebSocket) => {
    set({ socket: ws });
  },
}));