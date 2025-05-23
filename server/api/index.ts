import express from "express";
import { ContactFormType } from "../@types";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import verify from "../middlewares/verify";

const SecretKey = process.env.JWT_SECRET_KEY;

const api = express();

api.get("/", async (req, res) => {
    res.send("Welcome to ~/maytrade/api")
})

api.get("/logout", verify, async (req, res) => {
    res.clearCookie('access_token', { path: '/', httpOnly: true });

    // Respond to the client
    res.status(200).json({ message: 'Logout successful' });
})

api.post("/contact", async (req, res) => {
    const data: ContactFormType = req.body;

    try {
        // get the cookie tokem (access_token) and decoded & verify using jwt
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, SecretKey) as string;

        // find the user information by the access_token
        const user = await prisma.user.findUnique({ where: { username: decoded } });

        // check if the user email is equal to the form email
        if (user && data.email == user.email) {
            // if it's equal create new contact request and response the data and message and success code
            const new_contact = await prisma.contact.create({ data })
            console.log(`Contact Requested from: ${new_contact.email}. By: ${new_contact.name}`)
            return res.json({ message: "Contact message sent", code: 200, data: new_contact });
        }

        // Logic for user not logged in
        const check_email = await prisma.user.findUnique({ where: { email: data.email } });
        // if the given email is already registered in users database and the user is not logged in.
        // return Unauthorized Request
        if (check_email)
            return res.json({ message: `This email is already signed up. Please login to your account to send contact message using ${check_email.email}.`, code: 401 }).status(401);

        // if the email is not registered in the users and the user is not logged in send the contact request and register it
        const new_contact = await prisma.contact.create({ data })
        console.log(`Contact Requested from: ${new_contact.email}. \n By: ${new_contact.name}`)
        return res.json({ message: "Contact message sent", code: 200, data: new_contact });
    } catch (err) {
        console.log(err)
        return res.json({ code: 500, message: "Internal Server Error" }).status(500)
    }
})

export default api;