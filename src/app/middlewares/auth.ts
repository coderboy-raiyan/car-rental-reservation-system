import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRoles } from "../modules/user/user.interface";
import User from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

function auth(role: TUserRoles[]) {
    return catchAsync(async (req: Request, res: Response, next) => {
        const token = req.headers?.authorization?.split("Bearer ")[1];
        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You have no access to this route");
        }

        const isVerified = verify(token, config.JWT_ACCESS_SECRET) as JwtPayload;

        if (!isVerified) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Please login to access this route!");
        }

        if (!role && !role.length) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You have no access to this route");
        }

        if (!role.includes(isVerified.role)) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You have no access to this route");
        }

        const user = await User.findById(isVerified?._id);
        if (!user) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials. Please sign up!");
        }
        req.user = user;
        next();
    });
}

export default auth;
