import { Document, Types } from "mongoose";
import { TCar } from "../car/car.interface";
import { TUser } from "../user/user.interface";

export type TBooking = {
    date: Date;
    user: Types.ObjectId | (Document<TUser> & { _id: Types.ObjectId });
    car: Types.ObjectId | (Document<TCar> & { _id: Types.ObjectId });
    startTime: string;
    endTime: string;
    totalCost: number;
};
