import { z } from "zod";

const createBookingValidationSchema = z.object({
    body: z.object({
        carId: z.string(),
        date: z.string().date(),
        startTime: z.string().refine(
            (val) => {
                const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
                return timeRegex.test(val);
            },
            { message: "Invalid start time" }
        ),
    }),
});
const returnBookingValidationSchema = z.object({
    body: z.object({
        bookingId: z.string(),
        endTime: z.string().refine(
            (val) => {
                const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
                return timeRegex.test(val);
            },
            { message: "Invalid start time" }
        ),
    }),
});

const BookingValidations = {
    createBookingValidationSchema,
    returnBookingValidationSchema,
};

export default BookingValidations;
