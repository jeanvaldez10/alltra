import express from "express";
import verify from "../../middlewares/verify";
import prisma from "../../lib/prisma";
const category = express();

category.post("/create", verify, async (req, res) => {
    if (!req.user.roles.includes(1)) {
        return res.json({ message: "Unauthorized", code: 401 }).status(401)
    }
    const category = req.body;
    try {
        const new_category = await prisma.category.create({
            data: {
                name: category.name
            }
        })
        res.json({ message: "Category Created", code: 201, category: new_category }).status(201)
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal Server Error", code: 500 }).status(500)
    }
});

category.get("/", verify, async (req, res) => res.json({categories:  await prisma.category.findMany()}))

export default category;