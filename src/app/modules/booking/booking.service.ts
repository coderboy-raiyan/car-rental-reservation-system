import { compareAsc, differenceInHours } from "date-fns";
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

const returnTheCarFromBooking = async (payload: { bookingId: string; endTime: string }) => {
    const { bookingId } = payload;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new AppError(StatusCodes.NOT_FOUND, "Booking not found!");
    }
    const car = await Car.findById(booking.car);
    if (!car) {
        throw new AppError(StatusCodes.NOT_FOUND, "Car not found!");
    }

    const session = await mongoose.startSession();

    const startTime = new Date(`1970-01-01T${booking.startTime}:00`);
    const endTime = new Date(`1970-01-01T${payload.endTime}:00`);

    const compare = compareAsc(startTime, endTime);

    if (compare === 1) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `End time must be greater than start time : ${booking.startTime}`
        );
    }

    const duration = differenceInHours(endTime, startTime);

    const totalCost = duration * car.pricePerHour;

    try {
        session.startTransaction();

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { totalCost, endTime: payload.endTime },
            { session, new: true }
        );

        if (!updatedBooking) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update booking!");
        }

        const updatedCarStatus = await Car.findByIdAndUpdate(
            car._id,
            { status: CarConstants.CarStatus.available },
            { new: true, session }
        );

        if (!updatedCarStatus) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update car status!");
        }

        const updatedBookingWithReturnedCar = await Booking.findById(bookingId, {}, { session })
            .populate("user")
            .populate("car");

        await session.commitTransaction();
        await session.endSession();
        return updatedBookingWithReturnedCar;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const BookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getUserBookingFromDB,
    returnTheCarFromBooking,
};

export default BookingServices;
