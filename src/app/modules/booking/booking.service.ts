import { StatusCodes } from "http-status-codes";
import mongoose, { Types } from "mongoose";
import AppError from "../../errors/AppError";
import CarConstants from "../car/car.constant";
import Car from "../car/car.model";
import { TBooking } from "./booking.interface";
import Booking from "./booking.model";

const createBookingIntoDB = async (
    userId: Types.ObjectId,
    payload: Partial<TBooking & { carId: Types.ObjectId }>
) => {
    const { carId } = payload;
    const car = await Car.findById(carId);
    if (!car) {
        throw new AppError(StatusCodes.NOT_FOUND, "Car not found!");
    }
    if (car.status === "unavailable") {
        throw new AppError(StatusCodes.NOT_ACCEPTABLE, "Car is not available for booking!");
    }

    payload.user = userId;
    payload.car = carId;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const updatedCarStatus = await Car.findByIdAndUpdate(
            carId,
            { status: CarConstants.CarStatus.unavailable },
            { new: true, session }
        );

        if (!updatedCarStatus) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update car status!");
        }

        const createdBooking = await Booking.create([payload], { session });

        if (!createdBooking) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Failed to book car!");
        }

        await session.commitTransaction(), await session.endSession();
        return createdBooking[0];
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const getAllBookingFromDB = async (query: Record<string, unknown>) => {
    const bookingsQuery = Booking.find({});

    if (query?.carId) {
        bookingsQuery.find({ car: query?.carId });
    }
    if (query?.date) {
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!dateRegex.test(query?.date as string)) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "Invalid date. Date must be in format: YYYY-MM-DD"
            );
        }
        bookingsQuery.find({ date: new Date(query?.date as string) });
    }

    const result = await bookingsQuery.populate("user").populate("car");
    return result;
};

const getUserBookingFromDB = async (userId: Types.ObjectId) => {
    const result = await Booking.find({ user: userId }).populate("user").populate("car");
    return result;
};

const BookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getUserBookingFromDB,
};

export default BookingServices;
