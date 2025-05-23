import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import * as XLSX from 'xlsx';
import prisma from '../../lib/prisma';

interface ImportTemplate {
    id: string;
    name: string;
    description: string;
    requiredColumns: string[];
    dateFormat: string;
    columnMappings: Object;
}

function isImportTemplate(value: any): value is ImportTemplate {
    return (
        value && 
        typeof value === 'object' &&
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        typeof value.description === 'string' &&
        Array.isArray(value.requiredColumns) &&
        typeof value.dateFormat === 'string' &&
        typeof value.columnMappings === 'object'
    );
}
const importController = {
    // Process CSV file
    async processCSV(filePath: string, userId: string, brokerId: string, accountId: string, templateId?: string) {
        return new Promise<{ success: boolean; count?: number; message?: string }>(async (resolve, reject) => {
            try {
                // Get broker and template details
                const broker = await prisma.broker.findUnique({
                    where: { id: brokerId },
                    include: { importTemplates: true }
                });
                
                if (!broker) {
                    return resolve({ success: false, message: "Broker not found" });
                }
                
                let template: ImportTemplate | null = null;
                
                // If templateId is provided, find the specific template
                if (templateId) {
                    template = broker.importTemplates.find(t => t.id === templateId) || null;
                } else if (broker.importTemplates.length > 0) {
                    // Use the first template as default
                    template = broker.importTemplates[0];
                }
                
                if (!template) {
                    return resolve({ success: false, message: "Import template not found" });
                }
                
                // Read and parse the CSV file
                const results: any[] = [];
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', async () => {
                        // Validate required columns
                        const fileColumns = Object.keys(results[0] || {});
                        const missingColumns = template.requiredColumns.filter(col => !fileColumns.includes(col));
                        
                        if (missingColumns.length > 0) {
                            return resolve({
                                success: false,
                                message: `Missing required columns: ${missingColumns.join(', ')}`
                            });
                        }
                        
                        // Process the trades
                        const trades = [];
                        for (const row of results) {
                            try {
                                const tradeData = this.mapRowToTrade(row, template, userId, brokerId, accountId);
                                trades.push(tradeData);
                            } catch (error) {
                                console.error("Error processing row:", error);
                                // Continue processing other rows even if one fails
                            }
                        }
                        
                        // Bulk insert trades
                        if (trades.length > 0) {
                            await prisma.trade.createMany({
                                data: trades,
                                // skipDuplicates: true // Skip duplicates based on externalId //but doesnt work on MongoDB

                            });
                            
                            // Create import record
                            await prisma.tradeImport.create({
                                data: {
                                    userId,
                                    brokerId,
                                    accountId,
                                    importMethod: 'csv',
                                    importedAt: new Date(),
                                    tradesCount: trades.length,
                                    templateId: template.id,
                                    filename: path.basename(filePath)
                                }
                            });
                            
                            resolve({ success: true, count: trades.length });
                        } else {
                            resolve({ success: false, message: "No valid trades found in the file" });
                        }
                    })
                    .on('error', (error) => {
                        reject({ success: false, message: `Error parsing CSV: ${error.message}` });
                    });
            } catch (error) {
                reject({ success: false, message: `Unexpected error: ${error.message}` });
            }
        });
    },
    
    // Process Excel file
    async processExcel(filePath: string, userId: string, brokerId: string, accountId: string, templateId?: string) {
        try {
            // Get broker and template details
            const broker = await prisma.broker.findUnique({
                where: { id: brokerId },
                include: { importTemplates: true }
            });
            
            if (!broker) {
                return { success: false, message: "Broker not found" };
            }
            
            let template: ImportTemplate | null = null;
            
            // If templateId is provided, find the specific template
            if (templateId) {
                template = broker.importTemplates.find(t => t.id === templateId) || null;
            } else if (broker.importTemplates.length > 0) {
                // Use the first template as default
                template = broker.importTemplates[0];
            }
            
            if (!template) {
                return { success: false, message: "Import template not found" };
            }
            
            // Read the Excel file
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0]; // Use the first sheet
            const worksheet = workbook.Sheets[sheetName];
            
            // Convert sheet to JSON
            const results = XLSX.utils.sheet_to_json(worksheet);
            
            // Validate required columns
            if (results.length === 0) {
                return { success: false, message: "No data found in the file" };
            }
            
            const fileColumns = Object.keys(results[0]);
            const missingColumns = template.requiredColumns.filter(col => !fileColumns.includes(col));
            
            if (missingColumns.length > 0) {
                return {
                    success: false,
                    message: `Missing required columns: ${missingColumns.join(', ')}`
                };
            }
            
            // Process the trades
            const trades = [];
            for (const row of results) {
                try {
                    const tradeData = this.mapRowToTrade(row, template, userId, brokerId, accountId);
                    trades.push(tradeData);
                } catch (error) {
                    console.error("Error processing row:", error);
                    // Continue processing other rows even if one fails
                }
            }
            
            // Bulk insert trades
            if (trades.length > 0) {
                await prisma.trade.createMany({
                    data: trades,
                   // skipDuplicates: true // Skip duplicates based on externalId //but doesnt work on MongoDB
                });
                
                // Create import record
                await prisma.tradeImport.create({
                    data: {
                        userId,
                        brokerId,
                        accountId,
                        importMethod: 'excel',
                        importedAt: new Date(),
                        tradesCount: trades.length,
                        templateId: template.id,
                        filename: path.basename(filePath)
                    }
                });
                
                return { success: true, count: trades.length };
            } else {
                return { success: false, message: "No valid trades found in the file" };
            }
        } catch (error) {
            return { success: false, message: `Error processing Excel file: ${error.message}` };
        }
    },
    
    // Validate CSV file against template
    async validateCSV(filePath: string, template: ImportTemplate) {
        return new Promise<{
            valid: boolean;
            errors?: string[];
            missingColumns?: string[];
            extraColumns?: string[];
            sampleData?: any[];
            rowCount?: number;
        }>(async (resolve, reject) => {
            try {
                // Read and parse the CSV file
                const results: any[] = [];
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (data) => {
                        if (results.length < 5) { // Read only first 5 rows for validation
                            results.push(data);
                        }
                    })
                    .on('end', async () => {
                        if (results.length === 0) {
                            return resolve({
                                valid: false,
                                errors: ["No data found in the file"]
                            });
                        }
                        
                        // Validate column headers
                        const fileColumns = Object.keys(results[0]);
                        const missingColumns = template.requiredColumns.filter(col => !fileColumns.includes(col));
                        const extraColumns = fileColumns.filter(col => !Object.values(template.columnMappings).includes(col));
                        
                        // Check if all required columns are present
                        if (missingColumns.length > 0) {
                            return resolve({
                                valid: false,
                                errors: [`Missing required columns: ${missingColumns.join(', ')}`],
                                missingColumns,
                                extraColumns,
                                sampleData: results.slice(0, 5),
                                rowCount: results.length
                            });
                        }
                        
                        // Read the full file to get row count
                        let rowCount = 0;
                        fs.createReadStream(filePath)
                            .pipe(csv())
                            .on('data', () => rowCount++)
                            .on('end', () => {
                                resolve({
                                    valid: true,
                                    sampleData: results.slice(0, 5),
                                    rowCount,
                                    extraColumns: extraColumns.length > 0 ? extraColumns : undefined
                                });
                            });
                    })
                    .on('error', (error) => {
                        reject({
                            valid: false,
                            errors: [`Error parsing CSV: ${error.message}`]
                        });
                    });
            } catch (error) {
                reject({
                    valid: false,
                    errors: [`Unexpected error: ${error.message}`]
                });
            }
        });
    },
    
    // Validate Excel file against template
    async validateExcel(filePath: string, template: ImportTemplate) {
        try {
            // Read the Excel file
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0]; // Use the first sheet
            const worksheet = workbook.Sheets[sheetName];
            
            // Convert sheet to JSON
            const allResults = XLSX.utils.sheet_to_json(worksheet);
            
            if (allResults.length === 0) {
                return {
                    valid: false,
                    errors: ["No data found in the file"]
                };
            }
            
            // Validate column headers
            const fileColumns = Object.keys(allResults[0]);
            const missingColumns = template.requiredColumns.filter(col => !fileColumns.includes(col));
            const extraColumns = fileColumns.filter(col => !Object.values(template.columnMappings).includes(col));
            
            // Check if all required columns are present
            if (missingColumns.length > 0) {
                return {
                    valid: false,
                    errors: [`Missing required columns: ${missingColumns.join(', ')}`],
                    missingColumns,
                    extraColumns,
                    sampleData: allResults.slice(0, 5),
                    rowCount: allResults.length
                };
            }
            
            return {
                valid: true,
                sampleData: allResults.slice(0, 5),
                rowCount: allResults.length,
                extraColumns: extraColumns.length > 0 ? extraColumns : undefined
            };
        } catch (error) {
            return {
                valid: false,
                errors: [`Error processing Excel file: ${error.message}`]
            };
        }
    },
    
    // Map a row of data to a trade object
    mapRowToTrade(row: any, template: ImportTemplate, userId: string, brokerId: string, accountId: string) {
        // Get column mappings from template
        const mappings = template.columnMappings as {[key:string]: string};
        
        // Extract trade data using the mappings
        const symbol = row[mappings.symbol];
        const quantity = parseFloat(row[mappings.quantity]);
        const entryPrice = parseFloat(row[mappings.entryPrice]);
        const exitPrice = parseFloat(row[mappings.exitPrice]);
        
        // Parse dates
        let date = row[mappings.date];
        let exitDate = row[mappings.exitDate];
        
        // Convert dates if they're not already Date objects
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        
        if (!(exitDate instanceof Date) && exitDate) {
            exitDate = new Date(exitDate);
        }
        
        // Determine trade type (buy/sell)
        let tradeType = row[mappings.tradeType];
        if (!tradeType) {
            tradeType = entryPrice < exitPrice ? 'buy' : 'sell';
        }
        
        // Calculate profit
        let profit: number;
        if (row[mappings.profit] !== undefined) {
            profit = parseFloat(row[mappings.profit]);
        } else {
            // Calculate profit based on trade type
            if (tradeType.toLowerCase() === 'buy') {
                profit = (exitPrice - entryPrice) * quantity;
            } else {
                profit = (entryPrice - exitPrice) * quantity;
            }
            
            // Subtract fees and commissions if available
            if (row[mappings.fees]) {
                profit -= parseFloat(row[mappings.fees]);
            }
            
            if (row[mappings.commission]) {
                profit -= parseFloat(row[mappings.commission]);
            }
        }
        
        // Get risk if available
        let risk: number | undefined;
        if (row[mappings.risk]) {
            risk = parseFloat(row[mappings.risk]);
        }
        
        // Construct trade object
        return {
            userId,
            brokerId,
            accountId,
            symbol,
            quantity,
            entryPrice,
            exitPrice,
            date,
            exitDate: exitDate || date, // Use entry date if exit date is not available
            tradeType,
            profit,
            risk,
            commission: row[mappings.commission] ? parseFloat(row[mappings.commission]) : undefined,
            fees: row[mappings.fees] ? parseFloat(row[mappings.fees]) : undefined,
            externalId: row[mappings.externalId] // For tracking broker's trade ID if available
        };
    }
};

export default importController;