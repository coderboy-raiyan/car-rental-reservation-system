import UserConstants from "./user.constant";

export type TUserRoles = keyof typeof UserConstants.UserRoles;

export type TUser = {
    name: string;
    email: string;
    role: TUserRoles;
    password: string;
    phone: string;
    address: string;
};
