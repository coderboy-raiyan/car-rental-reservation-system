import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "./AppError";

function notFound(req: Request, res: Response, next: NextFunction) {
    next(new AppError(StatusCodes.NOT_FOUND, "Not Found"));
}

export default notFound;
