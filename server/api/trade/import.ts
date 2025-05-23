import express from "express";
import verify from "../../middlewares/verify";
import prisma from "../../lib/prisma";
import { HttpStatus } from "../../@types";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import importController from "../../controllers/trading/import";

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../../uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

interface FileFilterCallback {
    (error: Error | null, acceptFile: boolean): void;
}

interface FileFilterRequest extends express.Request {
    file?: Express.Multer.File;
}

const fileFilter = (req: FileFilterRequest, file: Express.Multer.File, cb: FileFilterCallback): void => {
    // Accept only CSV, XLS, and XLSX files
    if (
        file.mimetype === "text/csv" ||
        file.mimetype === "application/vnd.ms-excel" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only CSV and Excel files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});

const importRouter = express();

// Get import templates for different brokers
importRouter.get("/templates", verify, async (req, res) => {
    try {
        // Get all brokers with their import templates
        const brokers = await prisma.broker.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
                importTemplates: true
            }
        });
        
        res.json({
            data: brokers.map(broker => ({
                id: broker.id,
                name: broker.name,
                templates: broker.importTemplates
            })),
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve import templates",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Import trades from file
importRouter.post("/file", verify, upload.single("file"), async (req, res) => {
    try {
        const userId = req.user.id;
        const { brokerId, accountId, templateId } = req.body;
        
        if (!req.file) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "No file uploaded",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        if (!brokerId) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Broker ID is required",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
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
        
        // Process the file based on its type
        const filePath = req.file.path;
        const fileExt = path.extname(req.file.originalname).toLowerCase();
        
        let importResult;
        
        if (fileExt === ".csv") {
            importResult = await importController.processCSV(filePath, userId, brokerId, accountId, templateId);
        } else if (fileExt === ".xls" || fileExt === ".xlsx") {
            importResult = await importController.processExcel(filePath, userId, brokerId, accountId, templateId);
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Unsupported file format",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        // Clean up the temporary file
        fs.unlinkSync(filePath);
        
        if (!importResult.success) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: importResult.message || "Import failed",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        res.json({
            message: "Trades imported successfully",
            data: {
                importedTrades: importResult.count,
                importTime: new Date()
            },
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        
        // Clean up the temporary file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to import trades",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Validate file before import (to check if it matches the expected format)
importRouter.post("/validate", verify, upload.single("file"), async (req, res) => {
    try {
        const { brokerId, templateId } = req.body;
        
        if (!req.file) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "No file uploaded",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        if (!brokerId || !templateId) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Broker ID and template ID are required",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        // Get the expected format for the broker template
        const broker = await prisma.broker.findUnique({
            where: { id: brokerId },
            include: { importTemplates: true }
        });
        
        if (!broker) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Broker not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        const templates = broker.importTemplates ;
        const template = templates.find(t => t.id === templateId);
        
        if (!template) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Template not found",
                code: HttpStatus.NOT_FOUND
            });
        }
        
        // Process the file based on its type
        const filePath = req.file.path;
        const fileExt = path.extname(req.file.originalname).toLowerCase();
        
        let validationResult;
        
        if (fileExt === ".csv") {
            validationResult = await importController.validateCSV(filePath, template);
        } else if (fileExt === ".xls" || fileExt === ".xlsx") {
            validationResult = await importController.validateExcel(filePath, template);
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Unsupported file format",
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        // Clean up the temporary file
        fs.unlinkSync(filePath);
        
        if (!validationResult.valid) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "File validation failed",
                data: {
                    valid: false,
                    errors: validationResult.errors,
                    missingColumns: validationResult.missingColumns,
                    extraColumns: validationResult.extraColumns
                },
                code: HttpStatus.BAD_REQUEST
            });
        }
        
        res.json({
            message: "File validation successful",
            data: {
                valid: true,
                sampleData: validationResult.sampleData,
                rowCount: validationResult.rowCount
            },
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        
        // Clean up the temporary file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "File validation failed",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

// Get import history
importRouter.get("/history", verify, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const imports = await prisma.tradeImport.findMany({
            where: { userId },
            include: {
                broker: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                importedAt: "desc"
            }
        });
        
        res.json({
            data: imports,
            code: HttpStatus.OK
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve import history",
            code: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
});

export default importRouter;