import express from "express";
import verify from "../../middlewares/verify";
import prisma from "../../lib/prisma";
import { HttpStatus } from "../../@types";
import { useParams } from "../../lib/process-folder";

const connectRouter = express();

// Get connection status
connectRouter.get("/status/:brokerId", verify, async (req, res) => {
    try {
        const { brokerId } = req.params;
        const userId = req.user.id;
        
        // Verify broker exists
        const broker = await prisma.broker.findUnique({
            where: { id: brokerId }
        });
        
        if (!broker) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Broker not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Check connection status
        const connection = await prisma.userBroker.findFirst({
            where: {
                userId,
                brokerId
            }
        });
        
        if (!connection) {
            return res.json({
                connected: false,
                code: HttpStatus.OK
            });
        }
        
        // Check if token is expired
        const isExpired = connection.expiresAt && new Date(connection.expiresAt) < new Date();
        
        res.json({
            connected: connection.isActive && !isExpired,
            lastSynced: connection.lastSyncedAt,
            expiresAt: connection.expiresAt,
            isExpired,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to check connection status",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Set auto-sync settings
connectRouter.post("/settings/:brokerId", verify, async (req, res) => {
    try {
        const { brokerId } = req.params;
        const userId = req.user.id;
        const { autoSync, syncInterval } = req.body;
        
        // Validate input
        if (autoSync === undefined) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "autoSync setting is required",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        // Check if connection exists
        const connection = await prisma.userBroker.findFirst({
            where: {
                userId,
                brokerId
            }
        });
        
        if (!connection) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Broker connection not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Update settings
        await prisma.userBroker.update({
            where: { id: connection.id },
            data: {
                autoSync,
                syncInterval: syncInterval || connection.syncInterval
            }
        });
        
        res.json({
            message: "Connection settings updated successfully",
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update connection settings",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Request immediate sync
connectRouter.post("/sync-now/:brokerId", verify, async (req, res) => {
    try {
        const { brokerId } = req.params;
        const userId = req.user.id;
        
        // Check if connection exists
        const connection = await prisma.userBroker.findFirst({
            where: {
                userId,
                brokerId,
                isActive: true
            }
        });
        
        if (!connection) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Active broker connection not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Get broker details
        const broker = await prisma.broker.findUnique({
            where: { id: brokerId }
        });
        
        if (!broker) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Broker not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Trigger sync based on broker type
        // This is a simplified approach - in a real implementation, you'd use a factory or strategy pattern
        let syncResult;
        
        if (broker.name === "Tradovate") {
            // Import dynamically to avoid circular dependencies
            const tradovateController = require("../../controllers/trading/tradovate/trades");
            syncResult = await tradovateController.default.syncTrades(
                connection.accessToken,
                userId,
                req.body.accountId,
                req.body.startDate,
                req.body.endDate
            );
        } else {
            // Generic sync for other brokers
            // This is just a placeholder - you'd implement broker-specific sync methods
            syncResult = {
                success: false,
                message: `Sync not implemented for ${broker.name}`
            };
        }
        
        if (!syncResult.success) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: syncResult.message || "Sync failed",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        // Update last synced time
        await prisma.userBroker.update({
            where: { id: connection.id },
            data: {
                lastSyncedAt: new Date()
            }
        });
        
        res.json({
            message: "Sync completed successfully",
            data: {
                syncedTrades: syncResult.count,
                syncTime: new Date()
            },
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to execute manual sync",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

export default connectRouter;