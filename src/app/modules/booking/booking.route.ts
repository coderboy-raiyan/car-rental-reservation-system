import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import BookingControllers from "./booking.controller";
import BookingValidations from "./booking.validation";

const BookingRoutes = Router();

BookingRoutes.post(
    "/",
    auth(["user"]),
    validateRequest(BookingValidations.createBookingValidationSchema),
    BookingControllers.createBooking
);

BookingRoutes.get("/", auth(["admin"]), BookingControllers.getBookings);
BookingRoutes.get("/my-bookings", auth(["user"]), BookingControllers.getUserBookings);

export default BookingRoutes;
