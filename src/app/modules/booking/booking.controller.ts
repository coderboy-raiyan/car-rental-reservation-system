import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import BookingServices from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.createBookingIntoDB(req.user._id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Car booked successfully",
        data: result,
    });
});

const getBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Bookings retrieved successfully",
        data: result,
    });
});

const getUserBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getUserBookingFromDB(req.user._id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "My Bookings retrieved successfully",
        data: result,
    });
});

const BookingControllers = {
    createBooking,
    getBookings,
    getUserBookings,
};

export default BookingControllers;
