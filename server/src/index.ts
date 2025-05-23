import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import processFolder from "../lib/process-folder";
import nodemailer from "nodemailer";
import http from 'http';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Core from "../core";

dotenv.config();

const app = express();
const app_port = process.env.PORT;
const server = http.createServer(app);

const core = new Core(server)

core.start(() => {
  console.log("Core Started")
})


// Middleware
app.use(bodyParser({ extended: true }));
const corsOptions = {
  origin:[`http://${process.env.ORIGIN_IP}`,`http://${process.env.ORIGIN_IP}:81`], 
  methods: 'GET,POST,PUT,DELETE,PATCH', // Allowed HTTP methods
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Configure Nodemailer transport
export const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options> = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "maytrade.test@gmail.com",
    pass: "btnm mxzg gczo vylu",
  }
});

// Controller Function
const resolvedPath = path.resolve("./api");
processFolder(resolvedPath, '/api', app);

// Start the server
server.listen(app_port as unknown as number, () => {
  console.log("App listening on " + app_port + "...");
});

export default core;