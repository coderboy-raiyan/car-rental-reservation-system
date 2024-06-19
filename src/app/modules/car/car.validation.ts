import { z } from "zod";
import CarConstants from "./car.constant";

const createCarValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        color: z.string(),
        isElectric: z.boolean(),
        status: z
            .string(z.enum(Object.values(CarConstants.CarStatus) as [string, ...string[]]))
            .optional(),
        features: z.array(z.string()),
        pricePerHour: z.number(),
    }),
});

const CarValidations = {
    createCarValidationSchema,
};

export default CarValidations;
