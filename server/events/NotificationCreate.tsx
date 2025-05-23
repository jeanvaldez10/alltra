import { Events } from "../@types/index";
import core from "../src"; // Core manages connected users
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid"; // For better ID generation

// Initialize Prisma client
const prisma = new PrismaClient();

// Define Enhanced Notification Types
type NotificationType =
    | "message"
    | "like"
    | "follow"
    | "system"
    | "mention"
    | "comment"
    | "friend_request"
    | "reaction"; // Extended types

// Priority levels for notifications
type NotificationPriority = "low" | "medium" | "high" | "urgent";

// Enhanced Notification Interface with backward compatibility
type Notification = {
    id: string; // Unique notification ID
    userId: string; // The user this notification is sent to
    type: NotificationType; // Type of notification
    content: string; // Notification content, e.g., "You have a new message!"
    isRead: boolean; // Status: Has the user read the notification?
    createdAt: Date; // Timestamp of the notification
    priority?: NotificationPriority; // Optional priority level
    sourceId?: string; // Optional reference to the source (e.g., message ID)
    actionUrl?: string; // Optional deep link to the relevant content
    expiresAt?: Date; // Optional expiration date
    metadata?: Record<string, any>; // Optional additional data
};

// Notification templates for consistent messaging
const templates = {
    message: (sender: string, preview: string) =>
        `New message from ${sender}: ${preview.substring(0, 50)}${preview.length > 50 ? '...' : ''}`,

    like: (username: string, contentType: string) =>
        `${username} liked your ${contentType}`,

    follow: (username: string) =>
        `${username} started following you`,

    mention: (username: string, context: string) =>
        `${username} mentioned you in ${context}`,
};

// In-memory cache for faster access before DB operations complete
const notificationsCache: Map<string, Notification[]> = new Map();

// Create and Handle Notification Logic - keeping the original structure
const NotificationCreate = {
    event: Events.NOTIFICATION_CREATE,

    action: async (data: {
        userId: string;
        content: string;
        type: NotificationType;
        priority?: NotificationPriority;
        sourceId?: string;
        actionUrl?: string;
        expiresAt?: Date;
        metadata?: Record<string, any>;
        // Template data if using a template
        templateData?: {
            template: "message" | "like" | "follow" | "mention";
            params: Record<string, string>;
        };
    }) => {
        const {
            userId,
            type,
            priority = "medium",
            sourceId,
            actionUrl,
            expiresAt,
            metadata,
            templateData
        } = data;

        // Use template if provided, otherwise use direct content
        let content = data.content;
        if (templateData) {
            switch (templateData.template) {
                case "message":
                    content = templates.message(
                        templateData.params.sender,
                        templateData.params.preview
                    );
                    break;
                case "like":
                    content = templates.like(
                        templateData.params.username,
                        templateData.params.contentType
                    );
                    break;
                case "follow":
                    content = templates.follow(templateData.params.username);
                    break;
                case "mention":
                    content = templates.mention(
                        templateData.params.username,
                        templateData.params.context
                    );
                    break;
            }
        }

        // Generate a new notification with enhanced fields
        const notification: Notification = {
            id: uuidv4(), // Better unique ID generation
            userId,
            type,
            content,
            isRead: false, // New notifications are unread by default
            createdAt: new Date(),
            priority,
            sourceId,
            actionUrl,
            expiresAt,
            metadata
        };

        try {
            // Store in database using Prisma
            await prisma.notification.create({
                data: {
                    id: notification.id,
                    userId: notification.userId,
                    type: notification.type,
                    content: notification.content,
                    isRead: notification.isRead,
                    createdAt: notification.createdAt,
                    priority: notification.priority,
                    sourceId: notification.sourceId,
                    actionUrl: notification.actionUrl,
                    expiresAt: notification.expiresAt,
                    metadata: notification.metadata ? JSON.stringify(notification.metadata) : null
                }
            });

            // Add to in-memory cache
            if (!notificationsCache.has(userId)) {
                notificationsCache.set(userId, []);
            }
            notificationsCache.get(userId)?.push(notification);

            // Send the notification to the user via WebSocket if they're online
            core.users.forEach((user, key) => {
                if (key === userId) {
                    user.socket.send(
                        JSON.stringify({
                            e: Events.NOTIFICATION_CREATE,
                            d: notification, // Send the full notification data
                        })
                    );

                    // For high priority notifications, we could add additional handling
                    if (priority === "high" || priority === "urgent") {
                        // Log high priority notifications
                        console.log(`HIGH PRIORITY notification sent to user ${userId}: ${content}`);

                        // Could add push notification logic here
                        // if (user.deviceToken) { sendPushNotification(user.deviceToken, content); }
                    }
                }
            });

            console.log(`Notification sent to user ${userId}: ${content}`);
            return { success: true, notification };
        } catch (error) {
            console.error(`Failed to create notification for user ${userId}:`, error);
            return { success: false, error: error.message };
        }
    },
};

// Additional handler for reading notifications (maintaining the same pattern)
const NotificationMarkAsRead = {
    event: Events.NOTIFICATION_READ,

    action: async (data: {
        userId: string;
        notificationId: string | "all";
    }) => {
        const { userId, notificationId } = data;

        try {
            let updatedCount = 0;

            // Update in database
            if (notificationId === "all") {
                // Mark all notifications as read
                const result = await prisma.notification.updateMany({
                    where: {
                        userId,
                        isRead: false
                    },
                    data: {
                        isRead: true
                    }
                });
                updatedCount = result.count;
            } else {
                // Mark specific notification as read
                const notification = await prisma.notification.findFirst({
                    where: {
                        id: notificationId,
                        userId
                    }
                });

                if (notification && !notification.isRead) {
                    await prisma.notification.update({
                        where: { id: notificationId },
                        data: { isRead: true }
                    });
                    updatedCount = 1;
                }
            }

            // Update in cache
            if (notificationsCache.has(userId)) {
                const userNotifications = notificationsCache.get(userId);
                if (userNotifications) {
                    if (notificationId === "all") {
                        userNotifications.forEach(notification => {
                            notification.isRead = true;
                        });
                    } else {
                        const notification = userNotifications.find(n => n.id === notificationId);
                        if (notification) {
                            notification.isRead = true;
                        }
                    }
                }
            }

            // Notify client
            core.users.forEach((user, key) => {
                if (key === userId) {
                    user.socket.send(
                        JSON.stringify({
                            e: Events.NOTIFICATION_READ,
                            d: {
                                notificationId,
                                success: true,
                                count: updatedCount
                            }
                        })
                    );
                }
            });

            return { success: true, count: updatedCount };
        } catch (error) {
            console.error(`Failed to mark notification(s) as read for user ${userId}:`, error);
            return { success: false, error: error.message };
        }
    }
};

// Handler to get user notifications (maintaining the same pattern)
const NotificationGet = {
    event: Events.NOTIFICATION_CREATE,

    action: async (data: {
        userId: string;
        limit?: number;
        offset?: number;
        unreadOnly?: boolean;
        types?: NotificationType[];
    }) => {
        const {
            userId,
            limit = 20,
            offset = 0,
            unreadOnly = false,
            types
        } = data;

        try {
            // Build query conditions
            const where: any = { userId };

            if (unreadOnly) {
                where.isRead = false;
            }

            if (types && types.length > 0) {
                where.type = { in: types };
            }

            // Get notifications from database
            const [notifications, total, unreadCount] = await Promise.all([
                prisma.notification.findMany({
                    where,
                    orderBy: { createdAt: 'desc' },
                    skip: offset,
                    take: limit
                }),
                prisma.notification.count({ where }),
                prisma.notification.count({ where: { userId, isRead: false } })
            ]);

            // Format notifications (parse metadata JSON)
            const formattedNotifications = notifications.map(notification => ({
                ...notification,
                metadata: notification.metadata ? JSON.parse(notification.metadata as string) : undefined
            }));

            // Update cache
            if (offset === 0) {
                notificationsCache.set(userId, formattedNotifications as Notification[]);
            }

            return {
                success: true,
                notifications: formattedNotifications,
                total,
                unreadCount
            };
        } catch (error) {
            console.error(`Failed to get notifications for user ${userId}:`, error);
            return {
                success: false,
                error: error.message,
                notifications: [],
                total: 0,
                unreadCount: 0
            };
        }
    }
};

// Handler to delete notifications (maintaining the same pattern)
const NotificationDelete = {
    event: 50,

    action: async (data: {
        userId: string;
        notificationId: string;
    }) => {
        const { userId, notificationId } = data;

        try {
            // Check if notification exists and belongs to user
            const notification = await prisma.notification.findFirst({
                where: {
                    id: notificationId,
                    userId
                }
            });

            if (!notification) {
                return { success: false, message: "Notification not found" };
            }

            // Delete from database
            await prisma.notification.delete({
                where: { id: notificationId }
            });

            // Update cache
            if (notificationsCache.has(userId)) {
                const userNotifications = notificationsCache.get(userId);
                if (userNotifications) {
                    const updatedNotifications = userNotifications.filter(
                        n => n.id !== notificationId
                    );
                    notificationsCache.set(userId, updatedNotifications);
                }
            }

            return { success: true };
        } catch (error) {
            console.error(`Failed to delete notification for user ${userId}:`, error);
            return { success: false, error: error.message };
        }
    }
};

// Cleanup expired notifications (to be run on a schedule)
async function cleanupExpiredNotifications() {
    try {
        const result = await prisma.notification.deleteMany({
            where: {
                expiresAt: { lt: new Date() }
            }
        });

        console.log(`Cleaned up ${result.count} expired notifications`);

        // Clear cache since it might be stale
        notificationsCache.clear();

        return result.count;
    } catch (error) {
        console.error("Failed to clean up expired notifications:", error);
        return 0;
    }
}

// Set up scheduled cleanup (every day)
setInterval(cleanupExpiredNotifications, 24 * 60 * 60 * 1000);

export {
    NotificationCreate as default,
    NotificationMarkAsRead,
    NotificationGet,
    NotificationDelete
};

// --- Improved unique ID generation ---
function generateUniqueId(): string {
    return uuidv4();
}