import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
require('dotenv').config(); 
// Secret key for JWT (use a more secure one in production)
const JWT_SECRET = process.env.JWT_SECRET_KEY;
export interface DecodedToken {
  id: string;
  [key: string]: any;
};

// JWT Authentication function
export async function authenticate(token: string) {
  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({where: {username: decoded as string}})
    if (user) {
        return {isValid: true, user}
    }
    return {isValid: false}
  } catch (error) {
    return {isValid: false}; // Invalid token
  }
}
