import express from "express";

const users = express();

users.get("/", (req, res) => {
    res.json({hello: "Hey"})
})

export default users;