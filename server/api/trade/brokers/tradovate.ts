import express from "express";
import verify from "../../../middlewares/verify";
import prisma from "../../../lib/prisma";
import { HttpStatus } from "../../../@types";

import tradovateAuthController from "../../../controllers/trading/tradovate/auth";
import tradovateTradeController from "../../../controllers/trading/tradovate/trades";

const tradovateRouter = express();

// Authenticate with Tradovate
tradovateRouter.post("/auth", verify, async (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = req.user.id;
        
        if (!username || !password) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Username and password are required",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        const authResponse = await tradovateAuthController.authenticate(username, password);
        
        if (!authResponse.success) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: authResponse.message || "Authentication failed",
                code: HttpStatus.UNAUTHORIZED
            });
        }
        
        // Get the broker ID for Tradovate
        const tradovateBroker = await prisma.broker.findFirst({
            where: { name: "Tradovate" }
        });
        
        if (!tradovateBroker) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Tradovate broker not configured in the system",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Store or update the connection
        const existingConnection = await prisma.userBroker.findFirst({
            where: {
                userId,
                brokerId: tradovateBroker.id
            }
        });
        
        if (existingConnection) {
            await prisma.userBroker.update({
                where: { id: existingConnection.id },
                data: {
                    accessToken: authResponse.accessToken,
                    refreshToken: authResponse.refreshToken,
                    expiresAt: authResponse.expiresAt,
                    lastSyncedAt: new Date(),
                    isActive: true
                }
            });
        } else {
            await prisma.userBroker.create({
                data: {
                    userId,
                    brokerId: tradovateBroker.id,
                    accessToken: authResponse.accessToken,
                    refreshToken: authResponse.refreshToken,
                    expiresAt: authResponse.expiresAt,
                    lastSyncedAt: new Date(),
                    isActive: true
                }
            });
        }
        
        res.json({
            message: "Successfully authenticated with Tradovate",
            code: HttpStatus.OK,
            data: {
                connected: true,
                accountInfo: authResponse.accountInfo
            }
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to authenticate with Tradovate",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get available accounts
tradovateRouter.get("/accounts", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get the user's Tradovate connection
        const tradovateBroker = await prisma.broker.findFirst({
            where: { name: "Tradovate" }
        });
        
        if (!tradovateBroker) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Tradovate broker not configured in the system",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        const connection = await prisma.userBroker.findFirst({
            where: {
                userId,
                brokerId: tradovateBroker.id,
                isActive: true
            }
        });
        
        if (!connection) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "No active Tradovate connection found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Check token expiration and refresh if needed
        if (new Date(connection.expiresAt) < new Date()) {
            const refreshResponse = await tradovateAuthController.refreshToken(connection.refreshToken);
            
            if (!refreshResponse.success) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    message: "Session expired. Please reconnect your Tradovate account",
                    code: HttpStatus.UNAUTHORIZED
                });
            }
            
            // Update connection with new tokens
            await prisma.userBroker.update({
                where: { id: connection.id },
                data: {
                    accessToken: refreshResponse.accessToken,
                    refreshToken: refreshResponse.refreshToken,
                    expiresAt: refreshResponse.expiresAt
                }
            });
            
            connection.accessToken = refreshResponse.accessToken;
        }
        
        // Get accounts using the controller
        const accountsResponse = await tradovateAuthController.getAccounts(connection.accessToken);
        
        if (!accountsResponse.success) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: accountsResponse.message || "Failed to retrieve accounts",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        res.json({
            data: accountsResponse.accounts,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve Tradovate accounts",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Sync trades from Tradovate
tradovateRouter.post("/sync", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const { accountId, startDate, endDate } = req.body;
        
        if (!accountId) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Account ID is required",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        // Get the user's Tradovate connection
        const tradovateBroker = await prisma.broker.findFirst({
            where: { name: "Tradovate" }
        });
        
        if (!tradovateBroker) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Tradovate broker not configured in the system",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        const connection = await prisma.userBroker.findFirst({
            where: {
                userId,
                brokerId: tradovateBroker.id,
                isActive: true
            }
        });
        
        if (!connection) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "No active Tradovate connection found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Check token expiration and refresh if needed
        if (new Date(connection.expiresAt) < new Date()) {
            const refreshResponse = await tradovateAuthController.refreshToken(connection.refreshToken);
            
            if (!refreshResponse.success) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    message: "Session expired. Please reconnect your Tradovate account",
                    code: HttpStatus.UNAUTHORIZED
                });
            }
            
            // Update connection with new tokens
            await prisma.userBroker.update({
                where: { id: connection.id },
                data: {
                    accessToken: refreshResponse.accessToken,
                    refreshToken: refreshResponse.refreshToken,
                    expiresAt: refreshResponse.expiresAt
                }
            });
            
            connection.accessToken = refreshResponse.accessToken;
        }
        
        // Sync trades using the trade controller
        const syncResponse = await tradovateTradeController.syncTrades(
            connection.accessToken,
            userId,
            accountId,
            startDate,
            endDate
        );
        
        if (!syncResponse.success) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: syncResponse.message || "Failed to sync trades",
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
            message: "Successfully synced trades from Tradovate",
            code: HttpStatus.OK,
            data: {
                syncedTrades: syncResponse.count,
                syncTime: new Date()
            }
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to sync trades from Tradovate",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

export default tradovateRouter;