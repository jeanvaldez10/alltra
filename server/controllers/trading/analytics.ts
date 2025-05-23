import { format } from 'date-fns';

// Define Trade type for analytics
interface Trade {
    id: string;
    userId: string;
    symbol: string;
    quantity: number;
    entryPrice: number;
    exitPrice: number;
    date: Date;
    exitDate: Date;
    tradeType: string;
    profit: number;
    risk?: number;
    brokerId?: string;
    accountId?: string;
    commission?: number;
    fees?: number;
    notes?: any[];
    tags?: any[];
}
interface PnLData {
    period: string;
    profit: number;
    tradeCount: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    cumulativeProfit?: number; // Optional initially, added later
}
// Analytics controller with various calculation functions
const analyticsController = {
    // Calculate overview statistics
    calculateOverview(trades: Trade[]) {
        if (!trades.length) {
            return {
                totalTrades: 0,
                winningTrades: 0,
                losingTrades: 0,
                breakEvenTrades: 0,
                winRate: 0,
                totalProfit: 0,
                averageProfit: 0,
                totalLoss: 0,
                averageLoss: 0,
                netProfit: 0,
                profitFactor: 0,
                largestWin: 0,
                largestLoss: 0,
                averageTradeResult: 0
            };
        }

        const winningTrades = trades.filter(trade => trade.profit > 0);
        const losingTrades = trades.filter(trade => trade.profit < 0);
        const breakEvenTrades = trades.filter(trade => trade.profit === 0);
        
        const totalProfit = winningTrades.reduce((sum, trade) => sum + trade.profit, 0);
        const totalLoss = Math.abs(losingTrades.reduce((sum, trade) => sum + trade.profit, 0));
        const netProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
        
        const averageProfit = winningTrades.length ? totalProfit / winningTrades.length : 0;
        const averageLoss = losingTrades.length ? totalLoss / losingTrades.length : 0;
        
        // Find largest win and loss
        const largestWin = winningTrades.length 
            ? Math.max(...winningTrades.map(trade => trade.profit))
            : 0;
            
        const largestLoss = losingTrades.length 
            ? Math.min(...losingTrades.map(trade => trade.profit))
            : 0;
        
        // Calculate metrics
        const winRate = trades.length ? (winningTrades.length / trades.length) * 100 : 0;
        const profitFactor = totalLoss ? totalProfit / totalLoss : totalProfit > 0 ? Infinity : 0;
        const averageTradeResult = trades.length ? netProfit / trades.length : 0;
        
        return {
            totalTrades: trades.length,
            winningTrades: winningTrades.length,
            losingTrades: losingTrades.length,
            breakEvenTrades: breakEvenTrades.length,
            winRate: parseFloat(winRate.toFixed(2)),
            totalProfit: parseFloat(totalProfit.toFixed(2)),
            averageProfit: parseFloat(averageProfit.toFixed(2)),
            totalLoss: parseFloat(totalLoss.toFixed(2)),
            averageLoss: parseFloat(averageLoss.toFixed(2)),
            netProfit: parseFloat(netProfit.toFixed(2)),
            profitFactor: parseFloat(profitFactor.toFixed(2)),
            largestWin: parseFloat(largestWin.toFixed(2)),
            largestLoss: parseFloat(largestLoss.toFixed(2)),
            averageTradeResult: parseFloat(averageTradeResult.toFixed(2))
        };
    },
    
    // Calculate profit/loss over time
    calculatePnLOverTime(trades: Trade[], groupBy: string = 'day') {
        if (!trades.length) {
            return [];
        }
        
        // Sort trades by date
        const sortedTrades = [...trades].sort((a, b) => a.date.getTime() - b.date.getTime());
        
        // Group trades by the specified time period
        const groupedTrades: { [key: string]: Trade[] } = {};
        let dateFormat: string;
        
        switch (groupBy.toLowerCase()) {
            case 'hour':
                dateFormat = 'yyyy-MM-dd HH:00';
                break;
            case 'day':
                dateFormat = 'yyyy-MM-dd';
                break;
            case 'week':
                dateFormat = 'yyyy-ww'; // ISO week format
                break;
            case 'month':
                dateFormat = 'yyyy-MM';
                break;
            case 'year':
                dateFormat = 'yyyy';
                break;
            default:
                dateFormat = 'yyyy-MM-dd';
        }
        
        sortedTrades.forEach(trade => {
            const groupKey = format(trade.date, dateFormat);
            if (!groupedTrades[groupKey]) {
                groupedTrades[groupKey] = [];
            }
            groupedTrades[groupKey].push(trade);
        });
        
        // Calculate profit/loss for each period
        const pnlData :PnLData[]= Object.keys(groupedTrades).map(period => {
            const periodTrades = groupedTrades[period];
            const profit = periodTrades.reduce((sum, trade) => sum + trade.profit, 0);
            const winningTrades = periodTrades.filter(trade => trade.profit > 0).length;
            const losingTrades = periodTrades.filter(trade => trade.profit < 0).length;
            
            return {
                period,
                profit: parseFloat(profit.toFixed(2)),
                tradeCount: periodTrades.length,
                winningTrades,
                losingTrades,
                winRate: periodTrades.length ? parseFloat(((winningTrades / periodTrades.length) * 100).toFixed(2)) : 0
            };
        });
        
        // Calculate cumulative profit/loss
        let cumulativeProfit = 0;
        pnlData.forEach(period => {
            cumulativeProfit += period.profit;
            period.cumulativeProfit = parseFloat(cumulativeProfit.toFixed(2));
        });
        
        return pnlData;
    },
    
    // Calculate win/loss ratios
    calculateWinLossRatios(trades: Trade[], groupBy: string = 'overall') {
        if (!trades.length) {
            return [];
        }
        
        // For overall analysis
        if (groupBy === 'overall') {
            const winningTrades = trades.filter(trade => trade.profit > 0);
            const losingTrades = trades.filter(trade => trade.profit < 0);
            const breakEvenTrades = trades.filter(trade => trade.profit === 0);
            
            const winRate = trades.length ? (winningTrades.length / trades.length) * 100 : 0;
            const lossRate = trades.length ? (losingTrades.length / trades.length) * 100 : 0;
            const breakEvenRate = trades.length ? (breakEvenTrades.length / trades.length) * 100 : 0;
            
            return [{
                group: 'All Trades',
                totalTrades: trades.length,
                winningTrades: winningTrades.length,
                losingTrades: losingTrades.length,
                breakEvenTrades: breakEvenTrades.length,
                winRate: parseFloat(winRate.toFixed(2)),
                lossRate: parseFloat(lossRate.toFixed(2)),
                breakEvenRate: parseFloat(breakEvenRate.toFixed(2))
            }];
        }
        
        // Group trades by the specified attribute
        const groupedTrades: { [key: string]: Trade[] } = {};
        
        trades.forEach(trade => {
            let groupKey: string;
            
            switch (groupBy.toLowerCase()) {
                case 'symbol':
                    groupKey = trade.symbol;
                    break;
                case 'tradetype':
                case 'trade_type':
                    groupKey = trade.tradeType;
                    break;
                case 'broker':
                    groupKey = trade.brokerId || 'Unknown';
                    break;
                case 'account':
                    groupKey = trade.accountId || 'Unknown';
                    break;
                default:
                    groupKey = 'All Trades';
            }
            
            if (!groupedTrades[groupKey]) {
                groupedTrades[groupKey] = [];
            }
            groupedTrades[groupKey].push(trade);
        });
        
        // Calculate win/loss ratios for each group
        return Object.keys(groupedTrades).map(group => {
            const groupTrades = groupedTrades[group];
            const winningTrades = groupTrades.filter(trade => trade.profit > 0);
            const losingTrades = groupTrades.filter(trade => trade.profit < 0);
            const breakEvenTrades = groupTrades.filter(trade => trade.profit === 0);
            
            const winRate = groupTrades.length ? (winningTrades.length / groupTrades.length) * 100 : 0;
            const lossRate = groupTrades.length ? (losingTrades.length / groupTrades.length) * 100 : 0;
            const breakEvenRate = groupTrades.length ? (breakEvenTrades.length / groupTrades.length) * 100 : 0;
            
            return {
                group,
                totalTrades: groupTrades.length,
                winningTrades: winningTrades.length,
                losingTrades: losingTrades.length,
                breakEvenTrades: breakEvenTrades.length,
                winRate: parseFloat(winRate.toFixed(2)),
                lossRate: parseFloat(lossRate.toFixed(2)),
                breakEvenRate: parseFloat(breakEvenRate.toFixed(2))
            };
        });
    },
    
    // Calculate average metrics
    calculateAverages(trades: Trade[]) {
        if (!trades.length) {
            return {
                averageProfit: 0,
                averageProfitWinning: 0,
                averageLoss: 0,
                averageTradeResult: 0,
                averageRiskRewardRatio: 0,
                averageHoldingTime: 0
            };
        }
        
        const winningTrades = trades.filter(trade => trade.profit > 0);
        const losingTrades = trades.filter(trade => trade.profit < 0);
        
        const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
        const totalProfitWinning = winningTrades.reduce((sum, trade) => sum + trade.profit, 0);
        const totalLoss = Math.abs(losingTrades.reduce((sum, trade) => sum + trade.profit, 0));
        
        // Calculate average holding time in minutes
        const holdingTimes = trades
            .filter(trade => trade.exitDate) // Only include trades with exit dates
            .map(trade => {
                const entryTime = trade.date.getTime();
                const exitTime = trade.exitDate.getTime();
                return (exitTime - entryTime) / (1000 * 60); // Convert to minutes
            });
        
        const averageHoldingTime = holdingTimes.length 
            ? holdingTimes.reduce((sum, time) => sum + time, 0) / holdingTimes.length 
            : 0;
        
        // Calculate risk-reward ratio
        const tradesWithRisk = trades.filter(trade => trade.risk && trade.risk > 0);
        let riskRewardRatios: number[] = [];
        
        if (tradesWithRisk.length) {
            riskRewardRatios = tradesWithRisk.map(trade => {
                const reward = Math.abs(trade.profit);
                return reward / trade.risk!;
            });
        }
        
        const averageRiskRewardRatio = riskRewardRatios.length 
            ? riskRewardRatios.reduce((sum, ratio) => sum + ratio, 0) / riskRewardRatios.length 
            : 0;
        
        return {
            averageProfit: parseFloat((totalProfit / trades.length).toFixed(2)),
            averageProfitWinning: winningTrades.length ? parseFloat((totalProfitWinning / winningTrades.length).toFixed(2)) : 0,
            averageLoss: losingTrades.length ? parseFloat((totalLoss / losingTrades.length).toFixed(2)) : 0,
            averageTradeResult: parseFloat((totalProfit / trades.length).toFixed(2)),
            averageRiskRewardRatio: parseFloat(averageRiskRewardRatio.toFixed(2)),
            averageHoldingTime: parseFloat(averageHoldingTime.toFixed(2))
        };
    },
    
    // Calculate drawdown
    calculateDrawdown(trades: Trade[]) {
        if (!trades.length) {
            return {
                maxDrawdown: 0,
                maxDrawdownPercentage: 0,
                drawdownPeriods: []
            };
        }
        
        // Calculate equity curve
        let balance = 0;
        const equityCurve = trades.map(trade => {
            balance += trade.profit;
            return {
                date: trade.date,
                balance: balance
            };
        });
        
        // Find maximum drawdown
        let maxBalance = 0;
        let maxDrawdown = 0;
        let maxDrawdownStart: Date | null = null;
        let maxDrawdownEnd: Date | null = null;
        let currentDrawdownStart: Date | null = null;
        
        // Find all drawdown periods
        const drawdownPeriods: Array<{
            startDate: Date;
            endDate: Date;
            drawdown: number;
            drawdownPercentage: number;
            recoveryDate?: Date;
        }> = [];
        
        equityCurve.forEach((point, index) => {
            if (point.balance > maxBalance) {
                maxBalance = point.balance;
                
                // End of previous drawdown if we were in one
                if (currentDrawdownStart) {
                    const drawdown = maxBalance - Math.min(...equityCurve
                        .slice(equityCurve.findIndex(p => p.date === currentDrawdownStart), index + 1)
                        .map(p => p.balance));
                        
                    const minBalancePoint = equityCurve
                        .slice(equityCurve.findIndex(p => p.date === currentDrawdownStart), index + 1)
                        .reduce((min, p) => p.balance < min.balance ? p : min, { balance: Infinity, date: new Date() });
                        
                    const drawdownPercentage = maxBalance ? (drawdown / maxBalance) * 100 : 0;
                    
                    drawdownPeriods.push({
                        startDate: currentDrawdownStart,
                        endDate: minBalancePoint.date,
                        drawdown: parseFloat(drawdown.toFixed(2)),
                        drawdownPercentage: parseFloat(drawdownPercentage.toFixed(2)),
                        recoveryDate: point.date
                    });
                    
                    currentDrawdownStart = null;
                }
            } else if (point.balance < maxBalance && !currentDrawdownStart) {
                currentDrawdownStart = point.date;
            }
            
            // Calculate current drawdown
            const currentDrawdown = maxBalance - point.balance;
            if (currentDrawdown > maxDrawdown) {
                maxDrawdown = currentDrawdown;
                maxDrawdownStart = currentDrawdownStart;
                maxDrawdownEnd = point.date;
            }
        });
        
        // If we ended in a drawdown, record it
        if (currentDrawdownStart) {
            const drawdown = maxBalance - Math.min(...equityCurve
                .slice(equityCurve.findIndex(p => p.date === currentDrawdownStart))
                .map(p => p.balance));
                
            const minBalancePoint = equityCurve
                .slice(equityCurve.findIndex(p => p.date === currentDrawdownStart))
                .reduce((min, p) => p.balance < min.balance ? p : min, { balance: Infinity, date: new Date() });
                
            const drawdownPercentage = maxBalance ? (drawdown / maxBalance) * 100 : 0;
            
            drawdownPeriods.push({
                startDate: currentDrawdownStart,
                endDate: minBalancePoint.date,
                drawdown: parseFloat(drawdown.toFixed(2)),
                drawdownPercentage: parseFloat(drawdownPercentage.toFixed(2))
                // No recovery date since we're still in drawdown
            });
        }
        
        // Calculate max drawdown percentage
        const maxDrawdownPercentage = maxBalance ? (maxDrawdown / maxBalance) * 100 : 0;
        
        return {
            maxDrawdown: parseFloat(maxDrawdown.toFixed(2)),
            maxDrawdownPercentage: parseFloat(maxDrawdownPercentage.toFixed(2)),
            maxDrawdownStart,
            maxDrawdownEnd,
            drawdownPeriods: drawdownPeriods.sort((a, b) => b.drawdown - a.drawdown) // Sort by largest drawdown first
        };
    },
    
    // Analyze performance by time of day, day of week, etc.
    analyzeTimePerformance(trades: Trade[], timeFrame: string = 'hourOfDay') {
        if (!trades.length) {
            return [];
        }
        
        // Group trades by the specified time frame
        const groupedTrades: { [key: string]: Trade[] } = {};
        
        trades.forEach(trade => {
            let groupKey: string;
            const tradeDate = new Date(trade.date);
            
            switch (timeFrame.toLowerCase()) {
                case 'hourofday':
                case 'hour':
                    groupKey = tradeDate.getHours().toString().padStart(2, '0');
                    break;
                case 'dayofweek':
                case 'day':
                    // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    groupKey = days[tradeDate.getDay()];
                    break;
                case 'monthofyear':
                case 'month':
                    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                                   'July', 'August', 'September', 'October', 'November', 'December'];
                    groupKey = months[tradeDate.getMonth()];
                    break;
                default:
                    groupKey = tradeDate.getHours().toString().padStart(2, '0');
            }
            
            if (!groupedTrades[groupKey]) {
                groupedTrades[groupKey] = [];
            }
            groupedTrades[groupKey].push(trade);
        });
        
        // Define the order for time frames
        let orderedKeys: string[];
        switch (timeFrame.toLowerCase()) {
            case 'hourofday':
            case 'hour':
                orderedKeys = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
                break;
            case 'dayofweek':
            case 'day':
                orderedKeys = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                break;
            case 'monthofyear':
            case 'month':
                orderedKeys = ['January', 'February', 'March', 'April', 'May', 'June', 
                             'July', 'August', 'September', 'October', 'November', 'December'];
                break;
            default:
                orderedKeys = Object.keys(groupedTrades).sort();
        }
        
        // Calculate performance metrics for each time period
        return orderedKeys.map(period => {
            const periodTrades = groupedTrades[period] || [];
            const winningTrades = periodTrades.filter(trade => trade.profit > 0);
            const losingTrades = periodTrades.filter(trade => trade.profit < 0);
            
            const totalProfit = periodTrades.reduce((sum, trade) => sum + trade.profit, 0);
            const winRate = periodTrades.length ? (winningTrades.length / periodTrades.length) * 100 : 0;
            
            return {
                period,
                tradeCount: periodTrades.length,
                winningTrades: winningTrades.length,
                losingTrades: losingTrades.length,
                winRate: parseFloat(winRate.toFixed(2)),
                totalProfit: parseFloat(totalProfit.toFixed(2)),
                averageProfit: periodTrades.length ? parseFloat((totalProfit / periodTrades.length).toFixed(2)) : 0
            };
        });
    },
    
    // Analyze performance by symbol
    analyzeSymbolPerformance(trades: Trade[]) {
        if (!trades.length) {
            return [];
        }
        
        // Group trades by symbol
        const symbolMap: { [symbol: string]: Trade[] } = {};
        
        trades.forEach(trade => {
            if (!symbolMap[trade.symbol]) {
                symbolMap[trade.symbol] = [];
            }
            symbolMap[trade.symbol].push(trade);
        });
        
        // Calculate performance metrics for each symbol
        return Object.keys(symbolMap).map(symbol => {
            const symbolTrades = symbolMap[symbol];
            const winningTrades = symbolTrades.filter(trade => trade.profit > 0);
            const losingTrades = symbolTrades.filter(trade => trade.profit < 0);
            
            const totalProfit = symbolTrades.reduce((sum, trade) => sum + trade.profit, 0);
            const averageProfit = symbolTrades.length ? totalProfit / symbolTrades.length : 0;
            const winRate = symbolTrades.length ? (winningTrades.length / symbolTrades.length) * 100 : 0;
            
            // Calculate profitability
            const profitFactor = Math.abs(losingTrades.reduce((sum, trade) => sum + trade.profit, 0)) 
                ? winningTrades.reduce((sum, trade) => sum + trade.profit, 0) / Math.abs(losingTrades.reduce((sum, trade) => sum + trade.profit, 0)) 
                : winningTrades.length ? Infinity : 0;
            
            return {
                symbol,
                tradeCount: symbolTrades.length,
                winningTrades: winningTrades.length,
                losingTrades: losingTrades.length,
                winRate: parseFloat(winRate.toFixed(2)),
                totalProfit: parseFloat(totalProfit.toFixed(2)),
                averageProfit: parseFloat(averageProfit.toFixed(2)),
                profitFactor: parseFloat(profitFactor.toFixed(2))
            };
        }).sort((a, b) => b.totalProfit - a.totalProfit); // Sort by profit descending
    }
};

export default analyticsController;