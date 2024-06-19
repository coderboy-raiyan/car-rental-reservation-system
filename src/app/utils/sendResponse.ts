import { Response } from "express";

type TResponseData<T> = {
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
    token?: string;
};

function sendResponse<T>(
    res: Response,
    { success, message, statusCode, data, token }: TResponseData<T>
) {
    const responseObj = {
        success,
        message,
        data,
        token,
    };
    if (!token) delete responseObj[token];
    return res.status(statusCode).json(responseObj);
}

export default sendResponse;
