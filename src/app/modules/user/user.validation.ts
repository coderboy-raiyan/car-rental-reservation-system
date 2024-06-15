/* eslint-disable no-useless-escape */
import { z } from "zod";
import UserConstants from "./user.constant";

const passwordValidationSchema = z
    .string()
    .min(6)
    .superRefine((password, checkPassComplexity) => {
        const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
        const containsLowercase = (ch: string) => /[a-z]/.test(ch);
        const containsSpecialChar = (ch: string) =>
            /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
        let countOfUpperCase = 0,
            countOfLowerCase = 0,
            countOfNumbers = 0,
            countOfSpecialChar = 0;
        for (let i = 0; i < password.length; i++) {
            const ch = password.charAt(i);
            if (!isNaN(+ch)) countOfNumbers++;
            else if (containsUppercase(ch)) countOfUpperCase++;
            else if (containsLowercase(ch)) countOfLowerCase++;
            else if (containsSpecialChar(ch)) countOfSpecialChar++;
        }
        if (
            countOfLowerCase < 1 ||
            countOfUpperCase < 1 ||
            countOfSpecialChar < 1 ||
            countOfNumbers < 1
        ) {
            checkPassComplexity.addIssue({
                code: "custom",
                message: `Password must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, one special character, and one number.`,
            });
        }
    });

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        role: z
            .string(z.enum(Object.values(UserConstants.UserRoles) as [string, ...string[]]))
            .optional(),
        password: passwordValidationSchema,
        phone: z.string(),
        address: z.string(),
    }),
});

const signInUserValidationSchema = z.object({
    body: z.object({
        email: z.string(),
        password: passwordValidationSchema,
    }),
});

const UserValidations = {
    createUserValidationSchema,
    signInUserValidationSchema,
};

export default UserValidations;
