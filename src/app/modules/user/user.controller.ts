import { StatusCodes } from "http-status-codes";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import UserServices from "./user.service";

const registerUser = catchAsync(async (req, res) => {
    const result = await UserServices.registerUser(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});
const sigInUser = catchAsync(async (req, res) => {
    const { refreshToken, token, data } = await UserServices.signInUser(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === "production",
    });

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User logged in successfully",
        data,
        token,
    });
});

const UserControllers = {
    registerUser,
    sigInUser,
};

export default UserControllers;
