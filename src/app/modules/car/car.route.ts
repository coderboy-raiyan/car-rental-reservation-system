import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import BookingControllers from "../booking/booking.controller";
import BookingValidations from "../booking/booking.validation";
import CarControllers from "./car.controller";
import CarValidations from "./car.validation";

const CarRoutes = Router();

CarRoutes.post(
    "/",
    auth(["admin"]),
    validateRequest(CarValidations.createCarValidationSchema),
    CarControllers.createCar
);
CarRoutes.get("/", CarControllers.getAllCars);
CarRoutes.get("/:id", CarControllers.getSingleCar);
CarRoutes.put(
    "/return",
    auth(["admin"]),
    validateRequest(BookingValidations.returnBookingValidationSchema),
    BookingControllers.returnTheCarFromBooking
);
CarRoutes.put("/:id", auth(["admin"]), CarControllers.updateCar);
CarRoutes.delete("/:id", auth(["admin"]), CarControllers.deleteCar);

export default CarRoutes;
