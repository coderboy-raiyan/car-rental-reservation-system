import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import CarControllers from "./car.controller";
import CarValidations from "./car.validation";

const CarRoutes = Router();

CarRoutes.post(
    "/",
    validateRequest(CarValidations.createCarValidationSchema),
    CarControllers.createCar
);
CarRoutes.get("/", CarControllers.getAllCars);
CarRoutes.get("/:id", CarControllers.getSingleCar);
CarRoutes.put("/:id", CarControllers.updateCar);
CarRoutes.delete("/:id", CarControllers.deleteCar);

export default CarRoutes;
