
import express from "express";
import verify from "../../middlewares/verify";

const message = express();

message.post("/", verify, async (req, res) => {
    const message: {content: string, channel: string} = req.body;

    
})

export default message