import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

function validateRequest(zodSchema: AnyZodObject) {
    return catchAsync(async (req, res, next) => {
        await zodSchema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        next();
    });
}

export default validateRequest;
