import Chat from "./chat";
import {Events, IncomingMessageWithToken} from "../@types/index";
import {WebSocketServer, WebSocket} from "ws";
import {authenticate} from "../src/utils";
import MemberStatusChange from "../events/MemberStatusChange";
import WebsocketEventsController from "../controllers/events";
import main_middleware_events from "../middlewares/events";
import {verifyClient} from "../services/websocket";
import http from "http";

export default class Core {
	public chat: Chat;
	public socket: WebSocketServer;
	private server: http.Server;
	public users: Map<
		string,
		{
			socket: WebSocket;
			path: string;
			channel?: string;
		}
	>;

	constructor(server: http.Server) {
		this.chat = new Chat(this.socket, this.users);

		this.server = server;
		this.users = new Map<
			string,
			{socket: WebSocket; path: string; channel?: string}
		>();
	}

	public start(fn: () => void) {
		const wss = new WebSocketServer({
			server: this.server,
			verifyClient,
		});
		// WebSocket connection event

		wss.on(
			"connection",
			async (ws: WebSocket, req: IncomingMessageWithToken) => {
				const token = req.token;

				if (!token) {
					ws.send(
						JSON.stringify({
							error: "Authentication token missing or invalid",
						})
					);
					ws.close();
					return;
				}

				const user = await authenticate(token);

				if (!user.isValid) {
					ws.send(
						JSON.stringify({
							error: "Authentication failed",
						})
					);
					ws.close();
					return;
				}

				const userId = user.user.id;

				// Initialize path and channel from URL or set to defaults
				const initialPath = req.url || "/";
				let initialChannel = "";

				// We'll set the proper channel when the first PAGE_CHANGE event comes in
				console.log(
					`🔌 User ${user.user.username} (${userId}) connected with initial path: ${initialPath}`
				);

				this.users.set(userId, {
					socket: ws,
					path: initialPath,
					channel: initialChannel,
				});

				console.log(`✅ ${userId} connected`);
				MemberStatusChange.action({
					id: userId,
					status: "online",
				});
				console.log(`✅ Online users: ${this.users.size}`);

				// Log all connected users for debugging
				console.log("Currently connected users:");
				this.users.forEach((userSession, id) => {
					console.log(
						`  - User ${id}: path=${
							userSession.path
						}, channel=${userSession.channel || "none"}`
					);
				});

				// Handle incoming messages
				ws.on("message", (message: string) => {
					try {
						const data = JSON.parse(message);
						console.log(
							`📥 Message from ${user.user.username} (${userId}): event=${data.e}`
						);

						// Special handling for PAGE_CHANGE to ensure path and channel are updated
						if (data.e === Events.PAGE_CHANGE) {
							const path = data.d;
							const userSession =
								this.users.get(userId);

							if (userSession) {
								userSession.path = path;

								// Extract channel ID if in a chat path
								if (
									typeof path ===
										"string" &&
									path.startsWith("/chat/")
								) {
									const channelId =
										path.substring(
											"/chat/"
												.length
										);
									userSession.channel =
										channelId;
									console.log(
										`📋 User ${userId} navigated to channel: ${channelId}`
									);
								} else {
									userSession.channel = "";
								}

								this.users.set(
									userId,
									userSession
								);
								console.log(
									`📋 Updated user ${userId} path to ${path}, channel to ${
										userSession.channel ||
										"none"
									}`
								);
							}
						}

						main_middleware_events(
							data,
							user.user,
							WebsocketEventsController
						);
					} catch (error) {
						console.error(
							`❌ Error processing message from ${userId}:`,
							error
						);
					}
				});

				// Handle disconnection
				ws.on("close", () => {
					MemberStatusChange.action({
						id: userId,
						status: "offline",
					});
					console.log(`❌ ${userId} disconnected`);
					this.users.delete(userId);
					console.log(
						`❌ Online users: ${this.users.size}`
					);
				});
			}
		);

		this.socket = wss;
		fn();
	}

	listen() {}
}
