import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Channel, PrismaClient } from "@prisma/client";
import { User } from "../@types";
const prisma = new PrismaClient();

declare global {
    namespace Express {
        interface Request {
            user: User;
            channel?: Channel
        }
    }
}



const secret_key = process.env.JWT_SECRET_KEY;

// Authorization middleware using JWT (jsonwebtoken)
export default async function verify(req: Request, res: Response, next: NextFunction) {
    const testing=true

    
    if (testing){   
         const user = await prisma.user.findUnique({ where: { username: 'quantumlord' } })
        
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", code: 401 })
        }
        req.user = user;
        
        next()
        return
    }
    
    const token = req.cookies.access_token;

    if (!token) {
        return res.json({ message: "Unauthorized", code: 401 }).status(401)
    }

    try {
        const decoded = jwt.verify(token, secret_key as string) as string;

        const user = await prisma.user.findUnique({ where: { username: decoded } })

        if (!user) {
            return res.status(401).json({ message: "Unauthorized", code: 401 })
        }
        req.user = user;

        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "Unauthorized", code: 401 })
        return;
    }
}
