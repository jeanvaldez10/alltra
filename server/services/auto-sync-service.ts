import prisma from '../lib/prisma';
import tradovateAuthController from '../controllers/trading/tradovate/auth';
import tradovateTradeController from '../controllers/trading/tradovate/trades';

/**
 * Service to handle automated syncing of trade data from broker APIs
 */
class TradeSyncService {
    // How frequently to check for sync jobs (in milliseconds)
    private checkInterval: number = 60000; // 1 minute
    private isRunning: boolean = false;
    private intervalId: NodeJS.Timeout | null = null;
    
    /**
     * Start the auto-sync service
     */
    public start(): void {
        if (this.isRunning) {
            console.log('Trade sync service is already running');
            return;
        }
        
        this.isRunning = true;
        console.log('Starting trade sync service');
        
        // Run immediately on start
        this.checkAndSyncTrades();
        
        // Set up interval for periodic checks
        this.intervalId = setInterval(() => {
            this.checkAndSyncTrades();
        }, this.checkInterval);
    }
    
    /**
     * Stop the auto-sync service
     */
    public stop(): void {
        if (!this.isRunning || !this.intervalId) {
            console.log('Trade sync service is not running');
            return;
        }
        
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.intervalId = null;
        console.log('Stopped trade sync service');
    }
    
    /**
     * Check for connections due for sync and process them
     */
    private async checkAndSyncTrades(): Promise<void> {
        try {
            console.log('Checking for trades to sync...');
            
            // Find active broker connections with auto-sync enabled
            const connections = await prisma.userBroker.findMany({
                where: {
                    isActive: true,
                    autoSync: true
                },
                include: {
                    broker: true
                }
            });
            
            console.log(`Found ${connections.length} active connections to sync`);
            
            // Process each connection
            for (const connection of connections) {
                // Check if it's time to sync based on the interval
                const now = new Date();
                const lastSync = new Date(connection.lastSyncedAt);
                const minutesSinceLastSync = Math.floor((now.getTime() - lastSync.getTime()) / 60000);
                
                // Skip if not time yet (default to 240 minutes / 4 hours if not specified)
                const syncInterval = connection.syncInterval || 240;
                if (minutesSinceLastSync < syncInterval) {
                    console.log(`Skipping sync for user ${connection.userId} - last synced ${minutesSinceLastSync} minutes ago (interval: ${syncInterval})`);
                    continue;
                }
                
                console.log(`Syncing trades for user ${connection.userId} with ${connection.broker.name}`);
                
                try {
                    // Check if token is expired and needs refresh
                    if (new Date(connection.expiresAt) < now) {
                        console.log(`Refreshing token for user ${connection.userId}`);
                        
                        // Handle based on broker type
                        if (connection.broker.name === 'Tradovate') {
                            const refreshResult = await tradovateAuthController.refreshToken(connection.refreshToken!);
                            
                            if (!refreshResult.success) {
                                console.error(`Failed to refresh token for user ${connection.userId}: ${refreshResult.message}`);
                                continue;
                            }
                            
                            // Update token in database
                            await prisma.userBroker.update({
                                where: { id: connection.id },
                                data: {
                                    accessToken: refreshResult.accessToken!,
                                    refreshToken: refreshResult.refreshToken,
                                    expiresAt: refreshResult.expiresAt!
                                }
                            });
                            
                            connection.accessToken = refreshResult.accessToken!;
                        } else {
                            console.log(`Token refresh not implemented for broker: ${connection.broker.name}`);
                            continue;
                        }
                    }
                    
                    // Get user accounts for this broker
                    const accounts = await prisma.userAccount.findMany({
                        where: {
                            userId: connection.userId,
                            brokerId: connection.brokerId,
                            isActive: true
                        }
                    });
                    
                    if (accounts.length === 0) {
                        console.log(`No active accounts found for user ${connection.userId} with broker ${connection.broker.name}`);
                        continue;
                    }
                    
                    // Calculate date range for sync (from last sync until now)
                    const startDate = new Date(connection.lastSyncedAt);
                    const endDate = new Date();
                    
                    // Sync each account
                    for (const account of accounts) {
                        console.log(`Syncing account ${account.name} for user ${connection.userId}`);
                        
                        // Sync based on broker type
                        if (connection.broker.name === 'Tradovate') {
                            const syncResult = await tradovateTradeController.syncTrades(
                                connection.accessToken,
                                connection.userId,
                                account.id,
                                startDate.toISOString(),
                                endDate.toISOString()
                            );
                            
                            if (syncResult.success) {
                                console.log(`Successfully synced ${syncResult.count} trades for account ${account.name}`);
                            } else {
                                console.error(`Failed to sync trades for account ${account.name}: ${syncResult.message}`);
                            }
                        } else {
                            console.log(`Trade sync not implemented for broker: ${connection.broker.name}`);
                        }
                    }
                    
                    // Update last synced time
                    await prisma.userBroker.update({
                        where: { id: connection.id },
                        data: {
                            lastSyncedAt: new Date()
                        }
                    });
                    
                    console.log(`Completed sync for user ${connection.userId} with ${connection.broker.name}`);
                } catch (syncError) {
                    console.error(`Error during sync for user ${connection.userId}:`, syncError);
                }
            }
            
            console.log('Trade sync check completed');
        } catch (error) {
            console.error('Error in trade sync service:', error);
        }
    }
}

// Create singleton instance
const tradeSyncService = new TradeSyncService();

export default tradeSyncService;