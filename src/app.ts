import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ success: true, messages: "Server is healthy" });
});

export default app;
