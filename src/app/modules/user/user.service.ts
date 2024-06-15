import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import User from "./user.model";
import UserUtils from "./user.utils";

const registerUser = async (payload: TUser) => {
    const isUserExists = await User.findOne({ email: payload.email });
    if (isUserExists) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "An account with this information already exists. Please sign in!"
        );
    }
    const result = await User.create(payload);
    const restObj = result.toObject();
    delete restObj.password;
    return restObj;
};

const signInUser = async (payload: Partial<TUser>) => {
    const { email, password } = payload;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new AppError(StatusCodes.BAD_REQUEST, "You don't have an account. Please sign up!");
    }

    const isVerified = await User.verifyPassword(password, user.password);

    if (!isVerified) {
        throw new AppError(StatusCodes.FORBIDDEN, "Password is incorrect please try again!");
    }

    const accessToken = UserUtils.generateAccessToken({
        _id: user._id,
        role: user.role,
    });
    const refreshToken = UserUtils.generateRefreshToken({
        _id: user._id,
        role: user.role,
    });

    const restObj = user.toObject();
    delete restObj.password;

    return { refreshToken, token: accessToken, data: restObj };
};

const UserServices = {
    registerUser,
    signInUser,
};

export default UserServices;
