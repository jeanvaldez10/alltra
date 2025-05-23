"use client";

import {usePathname} from "next/navigation";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import {Events} from "../@types";
import {useWebSocketStore} from "../client/websocket";

const WebSocketContext = createContext<WebSocket | null>(null);

export function WebSocketProvider({children}: {children: React.ReactNode}) {
	const socketRef = useRef<WebSocket | null>(null);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [isReady, setIsReady] = useState(false);
	const pathname = usePathname();
	const initialPathSent = useRef(false);

	useEffect(() => {
		if (!socketRef.current) {
			console.log(
				"🔌 Connecting to WebSocket...at  ",
				`ws://${process.env.NEXT_PUBLIC_API_IP}`
			);
			console.log(`Current path: ${pathname}`);

			const ws = new WebSocket(
				`ws://${process.env.NEXT_PUBLIC_API_IP}`
			);

			ws.onopen = () => {
				console.log("✅ WebSocket Connected");
				console.log("📤 Sending initial path:", pathname);

				// Send the current path immediately after connection
				ws.send(
					JSON.stringify({
						e: Events.PAGE_CHANGE,
						d: pathname,
					})
				);

				initialPathSent.current = true;
				setIsReady(true);
			};

			ws.onclose = () => {
				console.log("❌ WebSocket Disconnected");
				setIsReady(false);
				initialPathSent.current = false;
			};

			ws.onerror = (error) => {
				console.error("⚠️ WebSocket Error:", error);
			};

			socketRef.current = ws;
			setSocket(ws);
			useWebSocketStore.getState().set(ws);
		}

		return () => {
			if (socketRef.current?.readyState === WebSocket.OPEN) {
				socketRef.current.close();
			}
			socketRef.current = null;
		};
	}, []);

	// Update path when it changes
	useEffect(() => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			console.log("📤 Sending path update:", pathname);
			socket.send(
				JSON.stringify({
					e: Events.PAGE_CHANGE,
					d: pathname,
				})
			);
		}
	}, [pathname, socket]);

	return (
		<WebSocketContext.Provider value={socket}>
			{children}
		</WebSocketContext.Provider>
	);
}

export function useWebSocket() {
	return useContext(WebSocketContext);
}
