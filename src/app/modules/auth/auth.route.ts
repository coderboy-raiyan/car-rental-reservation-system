import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import UserControllers from "../user/user.controller";
import UserValidations from "../user/user.validation";

const authRoutes = Router();

authRoutes.post(
    "/signup",
    validateRequest(UserValidations.createUserValidationSchema),
    UserControllers.registerUser
);

authRoutes.post(
    "/signin",
    validateRequest(UserValidations.signInUserValidationSchema),
    UserControllers.sigInUser
);

export default authRoutes;
