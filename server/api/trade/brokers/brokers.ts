import express from "express";
import verify from "../../../middlewares/verify";
import prisma from "../../../lib/prisma";
import { HttpStatus } from "../../../@types";
import tradovateRouter from "./tradovate";

const brokerRouter = express();

// Mount broker-specific routes
brokerRouter.use("/tradovate", tradovateRouter);
brokerRouter.get("/",  (req, res) => {
  res.json({
    status: "operational",
    message: "MayTrade Trading API is running : brokerRouter",
    code: HttpStatus.OK
  });
});

// Get all supported brokers
brokerRouter.get("/", verify, async (req, res) => {
    try {
        const brokers = await prisma.broker.findMany({
            select: {
                id: true,
                name: true,
                logo: true,
                description: true,
                isActive: true
            }
        });
        
        res.json({
            data: brokers,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve brokers",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get broker by ID
brokerRouter.get("/:id", verify, async (req, res) => {
    try {
        const { id } = req.params;
        
        const broker = await prisma.broker.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                logo: true,
                description: true,
                isActive: true,
                apiEndpoint: true
            }
        });
        
        if (!broker) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Broker not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        res.json({
            data: broker,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve broker",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get user-linked brokers
brokerRouter.get("/user/linked", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const linkedBrokers = await prisma.userBroker.findMany({
            where: { userId },
            include: {
                broker: {
                    select: {
                        id: true,
                        name: true,
                        logo: true
                    }
                }
            }
        });
        
        res.json({
            data: linkedBrokers,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve linked brokers",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Unlink a broker from user
brokerRouter.delete("/user/linked/:brokerId", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const { brokerId } = req.params;
        
        // Check if the connection exists
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
        
        // Delete the connection
        await prisma.userBroker.delete({
            where: {
                id: connection.id
            }
        });
        
        res.json({
            message: "Broker unlinked successfully",
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to unlink broker",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

export default brokerRouter;