import { Response } from "express";

type TResponseData<T> = {
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
    token?: string;
};

function sendResponse<T>(res: Response, { success, message, statusCode, data }: TResponseData<T>) {
    return res.status(statusCode).json({
        success,
        message,
        data,
    });
}

export default sendResponse;
