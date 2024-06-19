import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

function handleZodError(zodError: ZodError): TGenericErrorResponse {
    const errorSources: TErrorSources = zodError.issues.map(({ path, message }) => {
        return {
            path: path[path.length - 1],
            message,
        };
    });

    return {
        errorSources,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "Validation error",
    };
}

export default handleZodError;
