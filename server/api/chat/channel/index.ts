import express from "express";
import verify from "../../../middlewares/verify";
import prisma from "../../../lib/prisma";
import { HttpStatus, Roles } from "../../../@types";
const channel = express();

channel.post("/create", verify, async (req, res) => {
    const user = req.user;
    if (!user.roles.includes(Roles.ADMIN || Roles.OWNER || Roles.DEVELOPER))  
        return res.json({code: HttpStatus.UNAUTHORIZED, message: "Unathorized"});
    
    const { name, category_id } = req.body;

    try {
        const new_channel = await prisma.channel.create({
            data: {
                name,
                parent: category_id
            }
        });

        const category = await prisma.category.findUnique({
            where: { id: category_id },
            select: { channels: true }
        });

        await prisma.category.update({
            where: { id: category_id },
            data: { channels: { set: [...category.channels, new_channel.id] } }
        });

        res.json({ message: "Channel Created", code: 201, channel: new_channel }).status(201)
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal Server Error", code: 500 }).status(500)
    }
});

export default channel;