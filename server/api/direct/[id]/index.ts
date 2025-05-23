import express from "express";
import verify from "../../../middlewares/verify";
import prisma from "../../../lib/prisma";
import { HttpStatus } from "../../../@types";
import { useParams } from "../../../lib/process-folder";
const id = express();

id.get("/:id", verify, async (req, res) => {
    const { id } = useParams(req)
    const authUserId = req.user.id; // Assumed authenticated user ID from verify middleware

    try {
        // Validate the requested user exists
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "User not found",
                code: HttpStatus.NOT_FOUND,
            });
        }

        // Check if a Direct exists with both the authenticated user and the requested user
        const existingDirect = await prisma.direct.findFirst({
            where: {
                members: {
                    hasEvery: [authUserId, id], // Ensures both IDs are in the members array
                },
            },
            select: {
                id: true,
                members: true,
            },
        });

        if (existingDirect) {
            // If Direct exists, return its data
            return res.status(HttpStatus.OK).json({
                message: "Direct found",
                code: HttpStatus.OK,
                data: existingDirect,
            });
        }

        // If no Direct exists, create a new one
        const newDirect = await prisma.direct.create({
            data: {
                members: [authUserId, id], // Array with both user IDs
                pinned: [], // Initialize empty pinned messages
            },
            select: {
                id: true,
                members: true,
            },
        });

        // Return the newly created Direct
        return res.status(HttpStatus.CREATED).json({
            message: "Direct created",
            code: HttpStatus.CREATED,
            data: {
                id: newDirect.id,
                members: newDirect.members,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
            code: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
});

id.get("/:id/author", verify, async (req, res) => {
    const { id } = useParams(req)


    try {
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return res.json({
                message: "Author not found",
                code: HttpStatus.NOT_FOUND
            })
        }

        res.json({
            data: {
                name: user.full_name,
                avatar: "",
                id: user.id,
            },
            code: HttpStatus.OK
        })
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
            code: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
})

id.get("/:id/messages", verify, async (req, res) => {
    const { id } = useParams(req)


    try {
        const direct = await prisma.direct.findUnique({ where: { id } });
        if (!direct) {
            return res.json({
                message: "Direct not found",
                code: HttpStatus.NOT_FOUND
            })
        }

        const messages = await prisma.message.findMany({ where: { channel: direct.id } });

        res.json({
            data: messages,
            code: HttpStatus.OK
        })
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
            code: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
})

export default id;