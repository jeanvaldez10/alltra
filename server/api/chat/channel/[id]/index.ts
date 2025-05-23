import express from "express";
import verify from "../../../../middlewares/verify";
import { isUserOnline } from "../../../../middlewares/index";
import prisma from "../../../../lib/prisma";
import { HttpStatus } from "../../../../@types";
import { useParams } from "../../../../lib/process-folder";
import MessageCreateEvent from "../../../../events/MessageCreate";
import MessageDelete from "../../../../events/MessageDelete";
import MessageUpdate from "../../../../events/MessageUpdate";


const channel = express();



channel.post("/message", verify, isUserOnline, async (req, res) => {
    const channel = req.channel;
    const user = req.user;
    const data = req.body;

    console.log("📨 Message creation request:", {
        channelId: channel.id,
        userId: user.id,
        content: data.content?.substring(0, 20) + (data.content?.length > 20 ? '...' : '')
    });

    try {
        // Pass the message to the event handler
        MessageCreateEvent.action({ 
            content: data.content, 
            channel: channel.id,
            code: data.code || Math.random().toString(36).substring(7)
        }, user);
        
        // Send a success response
        return res.json({ 
            code: HttpStatus.OK, 
            message: "Message sent" 
        });
    } catch (err) {
        console.error("❌ Error creating message:", err);
        return res.json({ 
            code: HttpStatus.INTERNAL_SERVER_ERROR, 
            message: "Internal Server Error" 
        }).status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
});



channel.get("/", verify, isUserOnline, (req, res) => {
    const params = useParams(req);
    const channel = req.channel;
    res.json({channel})
})

// Create Message in Channel by (Channel ID)
channel.post("/message--", verify, isUserOnline, async (req, res) => {
    const channel = req.channel;
    const user = req.user;
    const data = req.body;

    try {
        MessageCreateEvent.action({ content: data.content, channel: channel.id }, user)
    } catch (err) {
        return res.json({ code: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error" }).status(HttpStatus.INTERNAL_SERVER_ERROR);
    }

});

// Delete Message By Id
channel.delete("/message/:message_id", verify, isUserOnline, async (req, res) => {
    const { message_id } = req.params;
    const user = req.user;
    const _channel = req.channel;
    const { id } = useParams(req);

    try {
        const _message = await prisma.message.findUnique({ where: { channel: _channel.id, id: message_id } });
        if (!_message) {
            return res.json({ code: HttpStatus.NOT_FOUND, message: `ID: ${id}, Message not found.` }).status(HttpStatus.NOT_FOUND);
        }

        if (_message.by !== user.id) {
            return res.json({ code: HttpStatus.UNAUTHORIZED, message: "Unauthorized" }).status(HttpStatus.UNAUTHORIZED)
        }

        MessageDelete.action({ id: message_id })
    } catch (err) {
        return res.json({ code: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error" }).status(HttpStatus.INTERNAL_SERVER_ERROR);
    }

});

channel.patch("/message/:message_id", verify, isUserOnline, async (req, res) => {
    const { id } = useParams(req);
    const data = req.body;
    const message_id = req.params.message_id;
    const user = req.user;

    try {
        MessageUpdate.action({ id: message_id, content: data.id }, user);
    } catch (err) {
        return res.json({ code: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error" }).status(HttpStatus.INTERNAL_SERVER_ERROR);
    }

})

export default channel;