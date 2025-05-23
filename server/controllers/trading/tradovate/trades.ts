import axios from 'axios';
import prisma from '../../../lib/prisma';

const TRADOVATE_BASE_URL = process.env.TRADOVATE_API_URL || 'https://demo.tradovateapi.com/v1';

// Helper interface for fill pairs
interface FillPair {
    id: string;
    exitPrice: number;
    entryPrice: number;
    position: any;
    entryFill: any;
    exitFill: any;
    entryFee: number;
    exitFee: number;
    profitLoss: number;
    symbol: string;
    tradeType: string;
    quantity: number;
}

const tradovateTradeController = {
    // Sync trades from Tradovate
    async syncTrades(
        accessToken: string, 
        userId: string, 
        accountId: string, 
        startDate?: string, 
        endDate?: string
    ): Promise<{ success: boolean; count?: number; message?: string }> {
        try {
            // Get the account from our database
            const userAccount = await prisma.userAccount.findUnique({
                where: { id: accountId },
                select: { externalAccountId: true }
            });
            
            if (!userAccount) {
                return { success: false, message: "Account not found" };
            }
            
            // Get the broker ID for Tradovate
            const tradovateBroker = await prisma.broker.findFirst({
                where: { name: "Tradovate" }
            });
            
            if (!tradovateBroker) {
                return { success: false, message: "Tradovate broker not configured in the system" };
            }
            
            // Parse date filters
            const parsedStartDate = startDate ? new Date(startDate) : new Date();
            parsedStartDate.setDate(parsedStartDate.getDate() - 30); // Default to 30 days ago
            
            const parsedEndDate = endDate ? new Date(endDate) : new Date();
            
            // Fetch fill data from Tradovate API
            const fillsResponse = await axios.get(`${TRADOVATE_BASE_URL}/fill/list`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                params: {
                    accountId: userAccount.externalAccountId
                }
            });
            
            if (!fillsResponse.data || !Array.isArray(fillsResponse.data)) {
                return { success: false, message: "Failed to retrieve fills from Tradovate" };
            }
            
            const fills = fillsResponse.data;
            
            // Fetch fill pairs for more complete trade data
            const fillPairsResponse = await axios.get(`${TRADOVATE_BASE_URL}/fillPair/list`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                params: {
                    accountId: userAccount.externalAccountId
                }
            });
            
            let fillPairs: FillPair[] = [];
            if (fillPairsResponse.data && Array.isArray(fillPairsResponse.data)) {
                fillPairs = fillPairsResponse.data;
            }
            
            // Process fill pairs into trades
            const trades = [];
            
            for (const pair of fillPairs) {
                // Skip if outside date range
                const fillDate = new Date(pair.entryFill.timestamp);
                if (fillDate < parsedStartDate || fillDate > parsedEndDate) {
                    continue;
                }
                
                // Get contract details
                const contract = await this.getContractDetails(accessToken, pair.entryFill.contractId);
                
                // Process the trade data
                const trade = {
                    userId,
                    brokerId: tradovateBroker.id,
                    accountId,
                    symbol: contract?.name || pair.symbol,
                    quantity: pair.quantity,
                    entryPrice: pair.entryPrice,
                    exitPrice: pair.exitPrice,
                    date: new Date(pair.entryFill.timestamp),
                    exitDate: new Date(pair.exitFill.timestamp),
                    tradeType: pair.tradeType,
                    profit: pair.profitLoss,
                    commission: pair.entryFee + pair.exitFee,
                    externalId: pair.id
                };
                
                trades.push(trade);
            }
            
            // Process individual fills that aren't paired yet
            // This would handle open positions
            const processedFillIds = new Set(
                fillPairs.flatMap(pair => [pair.entryFill.id, pair.exitFill.id])
            );
            
            const unpairedFills = fills.filter(fill => 
                !processedFillIds.has(fill.id) && 
                new Date(fill.timestamp) >= parsedStartDate && 
                new Date(fill.timestamp) <= parsedEndDate
            );
            
            // Get positions to help with unpaired fills
            const positionsResponse = await axios.get(`${TRADOVATE_BASE_URL}/position/list`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                params: {
                    accountId: userAccount.externalAccountId
                }
            });
            
            const positions = positionsResponse.data || [];
            
            // Process unpaired fills (open positions)
            for (const fill of unpairedFills) {
                // Get contract details
                const contract = await this.getContractDetails(accessToken, fill.contractId);
                
                // Find related position
                const position = positions.find(p => p.contractId === fill.contractId);
                
                if (position) {
                    // This is an open position
                    const trade = {
                        userId,
                        brokerId: tradovateBroker.id,
                        accountId,
                        symbol: contract?.name || "Unknown",
                        quantity: Math.abs(fill.qty),
                        entryPrice: fill.price,
                        exitPrice: null, // Open position
                        date: new Date(fill.timestamp),
                        exitDate: null, // Open position
                        tradeType: fill.qty > 0 ? "buy" : "sell",
                        profit: position.openPnl || 0,
                        commission: fill.fee || 0,
                        externalId: fill.id,
                        isOpen: true
                    };
                    
                    trades.push(trade);
                }
            }
            
            // Bulk insert trades
            if (trades.length > 0) {
                await prisma.trade.createMany({
                    data: trades,
                   // skipDuplicates: true // Skip duplicates based on externalId //but doesnt work on MongoDB
                });
                
                // Create sync record
                await prisma.tradeSync.create({
                    data: {
                        userId,
                        brokerId: tradovateBroker.id,
                        accountId,
                        syncedAt: new Date(),
                        tradesCount: trades.length,
                        startDate: parsedStartDate,
                        endDate: parsedEndDate
                    }
                });
                
                return { success: true, count: trades.length };
            } else {
                return { success: true, count: 0, message: "No new trades found in the specified date range" };
            }
        } catch (error) {
            console.error("Error syncing Tradovate trades:", error);
            
            return { 
                success: false, 
                message: error.response?.data?.errorText || error.message || "Failed to sync trades from Tradovate" 
            };
        }
    },
    
    // Helper to get contract details (caching could be added for performance)
    async getContractDetails(accessToken: string, contractId: string) {
        try {
            const response = await axios.get(`${TRADOVATE_BASE_URL}/contract/item`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                params: {
                    id: contractId
                }
            });
            
            return response.data;
        } catch (error) {
            console.error(`Error fetching contract details for ID ${contractId}:`, error);
            return null;
        }
    },
    
    // Helper to get product details
    async getProductDetails(accessToken: string, productId: string) {
        try {
            const response = await axios.get(`${TRADOVATE_BASE_URL}/product/item`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                params: {
                    id: productId
                }
            });
            
            return response.data;
        } catch (error) {
            console.error(`Error fetching product details for ID ${productId}:`, error);
            return null;
        }
    }
};

export default tradovateTradeController;