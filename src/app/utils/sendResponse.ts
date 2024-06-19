import { Response } from "express";
import { StatusCodes } from "http-status-codes";

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
        statusCode,
        message,
        data,
        token,
    };
    if (!token) delete responseObj[token];

    if (
        (Array.isArray(data) && !data.length) ||
        (typeof data === "object" && !Object.keys(data).length)
    ) {
        (responseObj.success = false),
            (responseObj.statusCode = StatusCodes.NOT_FOUND),
            (responseObj.message = "No Data Found"),
            (responseObj.data = [] as T);
    }

    return res.status(statusCode).json(responseObj);
}

export default sendResponse;
