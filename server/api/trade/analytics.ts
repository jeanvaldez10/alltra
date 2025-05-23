import express from "express";
import verify from "../../middlewares/verify";
import prisma from "../../lib/prisma";
import { HttpStatus } from "../../@types";
import analyticsController from "../../controllers/trading/analytics";

const analyticsRouter = express();

// Get overview statistics
analyticsRouter.get("/overview", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const { startDate, endDate, account, broker, symbol } = req.query;

        // Build filter conditions
        const filters: any = { userId };

        if (startDate) {
            filters.date = {
                ...(filters.date || {}),
                gte: new Date(startDate as string)
            };
        }

        if (endDate) {
            filters.date = {
                ...(filters.date || {}),
                lte: new Date(endDate as string)
            };
        }

        if (account) {
            filters.accountId = account as string;
        }

        if (broker) {
            filters.brokerId = broker as string;
        }

        if (symbol) {
            filters.symbol = symbol as string;
        }

        // Get all trades matching the filters
        const trades = await prisma.trade.findMany({
            where: filters,
            orderBy: {
                date: "asc"
            }
        });

        // Process trades with the analytics controller
        const overview = analyticsController.calculateOverview(trades);

        res.json({
            data: overview,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve overview statistics",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get profit/loss over time
analyticsRouter.get("/pnl", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            startDate,
            endDate,
            account,
            broker,
            symbol,
            groupBy = "day"
        } = req.query;

        // Build filter conditions
        const filters: any = { userId };

        if (startDate) {
            filters.date = {
                ...(filters.date || {}),
                gte: new Date(startDate as string)
            };
        }

        if (endDate) {
            filters.date = {
                ...(filters.date || {}),
                lte: new Date(endDate as string)
            };
        }

        if (account) {
            filters.accountId = account as string;
        }

        if (broker) {
            filters.brokerId = broker as string;
        }

        if (symbol) {
            filters.symbol = symbol as string;
        }

        // Get all trades matching the filters
        const trades = await prisma.trade.findMany({
            where: filters,
            orderBy: {
                date: "asc"
            }
        });

        // Process trades with the analytics controller
        const pnlData = analyticsController.calculatePnLOverTime(trades, groupBy as string);

        res.json({
            data: pnlData,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve P&L data",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get win/loss ratios
analyticsRouter.get("/win-loss", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            startDate,
            endDate,
            account,
            broker,
            symbol,
            groupBy = "overall"
        } = req.query;

        // Build filter conditions
        const filters: any = { userId };

        if (startDate) {
            filters.date = {
                ...(filters.date || {}),
                gte: new Date(startDate as string)
            };
        }

        if (endDate) {
            filters.date = {
                ...(filters.date || {}),
                lte: new Date(endDate as string)
            };
        }

        if (account) {
            filters.accountId = account as string;
        }

        if (broker) {
            filters.brokerId = broker as string;
        }

        if (symbol) {
            filters.symbol = symbol as string;
        }

        // Get all trades matching the filters
        const trades = await prisma.trade.findMany({
            where: filters
        });

        // Process trades with the analytics controller
        const winLossData = analyticsController.calculateWinLossRatios(trades, groupBy as string);

        res.json({
            data: winLossData,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve win/loss data",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get average metrics (profit, risk, reward, etc.)
analyticsRouter.get("/averages", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            startDate,
            endDate,
            account,
            broker,
            symbol
        } = req.query;

        // Build filter conditions
        const filters: any = { userId };

        if (startDate) {
            filters.date = {
                ...(filters.date || {}),
                gte: new Date(startDate as string)
            };
        }

        if (endDate) {
            filters.date = {
                ...(filters.date || {}),
                lte: new Date(endDate as string)
            };
        }

        if (account) {
            filters.accountId = account as string;
        }

        if (broker) {
            filters.brokerId = broker as string;
        }

        if (symbol) {
            filters.symbol = symbol as string;
        }

        // Get all trades matching the filters
        const trades = await prisma.trade.findMany({
            where: filters
        });

        // Process trades with the analytics controller
        const averagesData = analyticsController.calculateAverages(trades);

        res.json({
            data: averagesData,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve average metrics",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get drawdown analysis
analyticsRouter.get("/drawdown", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            startDate,
            endDate,
            account,
            broker
        } = req.query;

        // Build filter conditions
        const filters: any = { userId };

        if (startDate) {
            filters.date = {
                ...(filters.date || {}),
                gte: new Date(startDate as string)
            };
        }

        if (endDate) {
            filters.date = {
                ...(filters.date || {}),
                lte: new Date(endDate as string)
            };
        }

        if (account) {
            filters.accountId = account as string;
        }

        if (broker) {
            filters.brokerId = broker as string;
        }

        // Get all trades matching the filters, ordered by date
        const trades = await prisma.trade.findMany({
            where: filters,
            orderBy: {
                date: "asc"
            }
        });

        // Process trades with the analytics controller
        const drawdownData = analyticsController.calculateDrawdown(trades);

        res.json({
            data: drawdownData,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve drawdown analysis",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get performance by time metrics (hour of day, day of week, etc.)
analyticsRouter.get("/time-analysis", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            startDate,
            endDate,
            account,
            broker,
            timeFrame = "hourOfDay"
        } = req.query;

        // Build filter conditions
        const filters: any = { userId };

        if (startDate) {
            filters.date = {
                ...(filters.date || {}),
                gte: new Date(startDate as string)
            };
        }

        if (endDate) {
            filters.date = {
                ...(filters.date || {}),
                lte: new Date(endDate as string)
            };
        }

        if (account) {
            filters.accountId = account as string;
        }

        if (broker) {
            filters.brokerId = broker as string;
        }

        // Get all trades matching the filters
        const trades = await prisma.trade.findMany({
            where: filters
        });

        // Process trades with the analytics controller
        const timeAnalysisData = analyticsController.analyzeTimePerformance(trades, timeFrame as string);

        res.json({
            data: timeAnalysisData,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve time analysis",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get symbol performance metrics
analyticsRouter.get("/symbol-performance", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            startDate,
            endDate,
            account,
            broker
        } = req.query;

        // Build filter conditions
        const filters: any = { userId };

        if (startDate) {
            filters.date = {
                ...(filters.date || {}),
                gte: new Date(startDate as string)
            };
        }

        if (endDate) {
            filters.date = {
                ...(filters.date || {}),
                lte: new Date(endDate as string)
            };
        }

        if (account) {
            filters.accountId = account as string;
        }

        if (broker) {
            filters.brokerId = broker as string;
        }

        // Get all trades matching the filters
        const trades = await prisma.trade.findMany({
            where: filters
        });

        // Process trades with the analytics controller
        const symbolPerformanceData = analyticsController.analyzeSymbolPerformance(trades);

        res.json({
            data: symbolPerformanceData,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve symbol performance",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

export default analyticsRouter;