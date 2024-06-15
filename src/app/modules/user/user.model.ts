import { compare, hash } from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import UserConstants from "./user.constant";
import { TUser, TUserModel } from "./user.interface";

const userSchema = new Schema<TUser, TUserModel>(
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
            select: 0,
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

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hash(this.password, parseInt(config.BCRYPT_SALT_ROUNDS));
    }
    next();
});

userSchema.post("save", function (doc) {
    doc.password = null;
});

userSchema.statics.verifyPassword = async function (plainText: string, hashedPassword: string) {
    const isVerified = await compare(plainText, hashedPassword);
    return isVerified;
};

const User = model<TUser, TUserModel>("User", userSchema);

export default User;
