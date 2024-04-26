import { z } from "zod";

const userZodSchema = z.object({
    email: z.string(
        {invalid_type_error: 'Email must be a string.'}
    ).optional(),
    password: z.string(
        {invalid_type_error: 'Password must be a string.'}
    ).optional(),
    cellhpne: z.string().refine((value) => /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(value), {
        message: 'Cellphone must be a String and a valid phone number.'
    }).optional(),
    name: z.string(
        { invalid_type_error: 'Name must be a string.' }
    ).max(20,
        { message: "Must be 20 or fewer characters long" }
    ).optional(),
    surname: z.string(
        { invalid_type_error: 'Surname must be a string.' }
    ).max(20,
        { message: "Must be 20 or fewer characters long" }
    ).optional()
});

export default userZodSchema;