import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import notFound from "./app/errors/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app = express();

app.use(express.json());
app.use(cors({ origin: ["*"], credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ success: true, messages: "Server is healthy" });
});

// all routes
app.use("/api", router);

// notfound
app.use(notFound);

// global Error handler
app.use(globalErrorHandler);

export default app;
