/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from "http-status-codes";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

function handleMongoDBDuplicateError(error: any): TGenericErrorResponse {
    const errorSources: TErrorSources = [
        {
            path: Object.keys(error.keyValue)[0],
            message: `${Object.values(error.keyValue)[0]} is already exists`,
        },
    ];
    return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `${Object.values(error.keyValue)[0]} is already exists`,
        errorSources,
    };
}

export default handleMongoDBDuplicateError;
