import express from "express";

import { HttpStatus } from "../../@types";


const tradingRouter = express();

// Base route for health check and API status
tradingRouter.get("/",  (req, res) => {
  res.json({
    status: "operational",
    message: "MayTrade Trading API is running",
    code: HttpStatus.OK
  });
});

export default tradingRouter;