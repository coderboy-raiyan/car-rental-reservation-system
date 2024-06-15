import { Schema, model } from "mongoose";
import UserConstants from "./user.constant";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: Object.values(UserConstants.UserRoles),
            default: "user",
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = model<TUser>("User", userSchema);

export default User;
