import express, { Request, Response } from "express";
import { useParams } from "../../../lib/process-folder";


const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const params = useParams(req);

    console.log(params.id)

});

export default router;