import express from "express";
import core from "../../src";
import verify from "../../middlewares/verify";
import prisma from "../../lib/prisma";
const chat = express();

chat.get("/members", verify, async (req, res) => {
    const allUsers = await prisma.user.findMany(); // Fetch all users from the database
    const users: { id: string; name: string; avatar?: string; status: string; bio?: string, roles: number[] }[] = [];
    console.log(core.users)
    for (const user of allUsers) {
        const isOnline = core.users.has(user.id); // Check if the user is online
        
        users.push({
            id: user.id,
            name: user.full_name,
            avatar: "", // Use actual avatar URL if available
            status: isOnline ? "online" : "offline",
            bio: "",
            roles: user.roles
        });
    }

    res.json(users);
});

export default chat;