import { Router } from "express";
import AuthRoutes from "../modules/auth/auth.route";
import CarRoutes from "../modules/car/car.route";

const router = Router();

const routes: { path: string; route: Router }[] = [
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/cars",
        route: CarRoutes,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
