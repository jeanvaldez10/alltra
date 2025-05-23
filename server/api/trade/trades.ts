import express from "express";
import verify from "../../middlewares/verify";
import prisma from "../../lib/prisma";
import { HttpStatus } from "../../@types";

const tradesRouter = express();

// Get all trades for a user
tradesRouter.get("/", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const { 
            page = 1, 
            limit = 20, 
            sort = "date", 
            order = "desc",
            startDate,
            endDate,
            symbol,
            broker,
            account,
            tradeType,
            minProfit,
            maxProfit
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
        
        if (symbol) {
            filters.symbol = symbol as string;
        }
        
        if (broker) {
            filters.brokerId = broker as string;
        }
        
        if (account) {
            filters.accountId = account as string;
        }
        
        if (tradeType) {
            filters.tradeType = tradeType as string;
        }
        
        if (minProfit !== undefined) {
            filters.profit = {
                ...(filters.profit || {}),
                gte: parseFloat(minProfit as string)
            };
        }
        
        if (maxProfit !== undefined) {
            filters.profit = {
                ...(filters.profit || {}),
                lte: parseFloat(maxProfit as string)
            };
        }
        
        // Parse pagination parameters
        const pageNum = Math.max(1, parseInt(page as string));
        const limitNum = Math.max(1, Math.min(100, parseInt(limit as string)));
        const skip = (pageNum - 1) * limitNum;
        
        // Build sort options
        const sortField = sort as string;
        const sortOrder = order as string === "asc" ? "asc" : "desc";
        const orderBy: any = {};
        orderBy[sortField] = sortOrder;
        
        // Get total count
        const totalTrades = await prisma.trade.count({
            where: filters
        });
        
        // Get trades with pagination and sorting
        const trades = await prisma.trade.findMany({
            where: filters,
            include: {
                broker: {
                    select: {
                        name: true,
                        logo: true
                    }
                },
                account: {
                    select: {
                        name: true,
                        accountNumber: true
                    }
                }
            },
            orderBy,
            skip,
            take: limitNum
        });
        
        res.json({
            data: {
                trades,
                total: totalTrades,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(totalTrades / limitNum)
            },
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve trades",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get a specific trade by ID
tradesRouter.get("/:id", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        
        const trade = await prisma.trade.findFirst({
            where: {
                id,
                userId
            },
            include: {
                broker: {
                    select: {
                        name: true,
                        logo: true
                    }
                },
                account: {
                    select: {
                        name: true,
                        accountNumber: true
                    }
                },
                entries: true,
                exits: true,
                notes: true,
                tags: true
            }
        });
        
        if (!trade) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Trade not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        res.json({
            data: trade,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve trade",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Add a note to a trade
tradesRouter.post("/:id/notes", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { content } = req.body;
        
        if (!content) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Note content is required",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        // Check if trade exists and belongs to user
        const trade = await prisma.trade.findFirst({
            where: {
                id,
                userId
            }
        });
        
        if (!trade) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Trade not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Add note
        const note = await prisma.tradeNote.create({
            data: {
                tradeId: id,
                content,
                createdAt: new Date()
            }
        });
        
        res.json({
            message: "Note added successfully",
            data: note,
            code: HttpStatus.CREATED
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to add note",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Delete a note
tradesRouter.delete("/notes/:noteId", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const { noteId } = req.params;
        
        // Find the note and associated trade
        const note = await prisma.tradeNote.findUnique({
            where: { id: noteId },
            include: {
                trade: {
                    select: {
                        userId: true
                    }
                }
            }
        });
        
        if (!note) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Note not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Check if trade belongs to user
        if (note.trade.userId !== userId) {
            return res.status(HttpStatus.FORBIDDEN).json({
                message: "You do not have permission to delete this note",
                code: HttpStatus.FORBIDDEN
            });
        }
        
        // Delete note
        await prisma.tradeNote.delete({
            where: { id: noteId }
        });
        
        res.json({
            message: "Note deleted successfully",
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to delete note",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Add tags to a trade
tradesRouter.post("/:id/tags", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { tags } = req.body;
        
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Tags array is required",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        // Check if trade exists and belongs to user
        const trade = await prisma.trade.findFirst({
            where: {
                id,
                userId
            }
        });
        
        if (!trade) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Trade not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Process tags
        const existingTags = await prisma.tag.findMany({
            where: {
                name: {
                    in: tags
                },
                userId
            }
        });
        
        const existingTagNames = existingTags.map(tag => tag.name);
        const newTagNames = tags.filter(tag => !existingTagNames.includes(tag));
        
        // Create new tags
        const newTags = await Promise.all(
            newTagNames.map(name => 
                prisma.tag.create({
                    data: {
                        name,
                        userId
                    }
                })
            )
        );
        
        const allTags = [...existingTags, ...newTags];
        
        // Link tags to trade
        await Promise.all(
            allTags.map(tag => 
                prisma.tradeTag.create({
                    data: {
                        tradeId: id,
                        tagId: tag.id
                    }
                }).catch(err => {
                    // Ignore duplicate entries
                    if (err.code !== 'P2002') throw err;
                })
            )
        );
        
        res.json({
            message: "Tags added successfully",
            data: {
                tags: allTags
            },
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to add tags",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Remove a tag from a trade
tradesRouter.delete("/:id/tags/:tagId", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id, tagId } = req.params;
        
        // Check if trade exists and belongs to user
        const trade = await prisma.trade.findFirst({
            where: {
                id,
                userId
            }
        });
        
        if (!trade) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Trade not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Check if tag exists and belongs to user
        const tag = await prisma.tag.findFirst({
            where: {
                id: tagId,
                userId
            }
        });
        
        if (!tag) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Tag not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Remove tag from trade
        await prisma.tradeTag.deleteMany({
            where: {
                tradeId: id,
                tagId
            }
        });
        
        res.json({
            message: "Tag removed successfully",
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to remove tag",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get symbols traded by the user
tradesRouter.get("/symbols/list", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const symbols = await prisma.trade.findMany({
            where: {
                userId
            },
            select: {
                symbol: true
            },
            distinct: ['symbol']
        });
        
        res.json({
            data: symbols.map(item => item.symbol),
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve symbols",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get all user tags
tradesRouter.get("/tags/list", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const tags = await prisma.tag.findMany({
            where: {
                userId
            }
        });
        
        res.json({
            data: tags,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve tags",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

export default tradesRouter;