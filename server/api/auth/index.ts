import jwt, { JwtPayload } from "jsonwebtoken";
import express from 'express';
import { PrismaClient } from "@prisma/client";
import CryptIt from "../../lib/CryptIt";
import { transporter } from "../../src";
const prisma = new PrismaClient();
const SecretKey = process.env.JWT_SECRET_KEY;
const auth = express();

type VerficationEmailCacheType = {
    email: string,
    code: string,
    attempts: number
}

var sent_verification_emails: VerficationEmailCacheType[] = [];
setInterval(() => {
    sent_verification_emails = sent_verification_emails.filter((mail) => mail.attempts < 3);
    
}, 60000);

auth.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.json({ message: "Email or password are incorrect.", code: 401 }).status(401);
            return;
        }
        const crypted_password = CryptIt(password);
        if (crypted_password !== user.password) {
            res.json({ message: "Email or password are incorrect.", code: 401 }).status(401);
            return;
        }
        const new_token = jwt.sign(user.username, SecretKey);
        res.cookie("access_token", new_token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24*60*60*1000
        })
        delete user.password;
        res.json({ user, message: "Logged in", code: 200 }).status(200)
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal Server Error", code: 500 }).status(500);
    }
})

// Check email then if its not already registered it sent verification code.
// TODO: User can skip email verification and do it later.
auth.post("/check-email", async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            res.json({ message: "Bad Request", code: 400 }).status(400)
            return;
        }
        const find_email = await prisma.user.findUnique({ where: { email } });
        if (find_email) {
            res.json({ message: "Email already registered", code: 409 }).status(409);
            return;
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        const find_send_email = sent_verification_emails.find((mail) => mail.email == email);
        if (!find_send_email) {
            sent_verification_emails.push({ email, code: code.toString(), attempts: 1 });
        } else {
            if (find_send_email.attempts == 3) {
                res.json({message: "Verification failed, please try later.", code: 417}).status(417);
                return;
            }
            find_send_email.attempts++;
            find_send_email.code = code.toString();
        }

        console.log(sent_verification_emails);
       
        
        transporter.sendMail({
            subject: "Email Verification",
            to: email,
            from: "maytrade.test@gmail.com",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 50px auto;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #333;
        }
        .code-box {
            background-color: #f4f4f4;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            padding: 15px;
            margin: 20px 0;
            color: #333;
            letter-spacing: 2px;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 14px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <p>Hi there,</p>
        <p>Thank you for signing up! Use the verification code below to verify your email address:</p>
        <div class="code-box">${code}</div>
        <p>If you didn’t request this, please ignore this email.</p>
        <div class="footer">
            <p>MayTrade Team</p>
        </div></div></body></html>`
        }, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })

        res.json({ message: "Email is available", code: 200 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal Server Error", code: 500 }).status(500);
    }
})

auth.get('/verify', async (req, res) => {
    if (!req.cookies.access_token) {        
        return res.status(401).json({ message: "Unauthorized", code: 401 });
    }
    const access_token = req.cookies.access_token;
    try {
        // if (!jwt.verify(access_token, secret_key)) {
        //     return res.status(401).json({ message: "Unauthorized" })
        // }
        const decoded = jwt.verify(access_token, SecretKey as string);
        const user = await prisma.user.findUnique({
            where: { username: decoded as string },
            select: {
                username: true,
                createdAt: true,
                id: true,
                email: true,
                subscription: true,
                roles: true,
                full_name: true
            }
        })
        if (!user) {
          
           return res.json({ message: "Unauthorized", code: 401 }).status(401);
        }

        res.json(user)
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", code: 401 })
    }
})

auth.post("/signup", async (req, res) => {
    const form = req.body;
    delete form.last_name;
    delete form.first_name;
    try {
        const check_user = await prisma.user.findUnique({ where: { username: form.username } });
        if (check_user) {
            return  res.json({ message: `username ${check_user.username} are already taken`, code: 401 }).status(401);;
        }

        if (!form.email || !form.password || !form.username || !form.full_name) {
            return res.json({ message: "Invalid request", code: 400 }).status(400);
        }

        const get_verification_code = sent_verification_emails.find((email) => email.email == form.email)
        if (form.verification_code !== get_verification_code.code.toString()) {
            return res.json({message: "Failed email verification code.", code: 417}).status(417);
        }

        sent_verification_emails = sent_verification_emails.filter((mail) => mail.email !== form.email)

        delete form.verification_code;

        const new_user = await prisma.user.create({ data: {...form, subscription: 0, password: CryptIt(form.password)} });
        res.json({ message: "User created successfully.", code: 201, user: new_user }).status(201);
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internet Server Error", code: 500 }).status(500)
    }
})


auth.get("/verify", async (req, res) => {
    if (!req.cookies.access_token) {
        res.json({ message: "Unauthorized", code: 401 }).status(401);
        return;
    }
    const access_token = req.cookies.access_token;
    try {
        const decoded = jwt.verify(access_token, SecretKey) as JwtPayload;
        const user = await prisma.user.findUnique({ where: { username: decoded.username } })
        if (!user) {
            
            return res.json({ message: "Unauthorized", code: 401 }).status(401);
        }
        delete user.password;
        res.json({ message: "Authorized", code: 200, user });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internet Server Error", code: 500 }).status(500);
    }
})


export default auth;