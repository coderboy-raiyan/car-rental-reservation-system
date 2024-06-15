import { NextFunction, Request, RequestHandler, Response } from "express";

function catchErrorAsync(fn: RequestHandler) {
    return function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
}

export default catchErrorAsync;
