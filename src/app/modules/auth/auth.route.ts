import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import UserControllers from "../user/user.controller";
import UserValidations from "../user/user.validation";

const AuthRoutes = Router();

AuthRoutes.post(
    "/signup",
    validateRequest(UserValidations.createUserValidationSchema),
    UserControllers.registerUser
);

AuthRoutes.post(
    "/signin",
    validateRequest(UserValidations.signInUserValidationSchema),
    UserControllers.sigInUser
);

export default AuthRoutes;
