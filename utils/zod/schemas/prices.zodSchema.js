import { z } from "zod";

const priceZodSchema = z.object({
    reference: z.string(
        { invalid_type_error: 'Reference must be a string.' }
    ).optional(),
    code: z.string(
        { invalid_type_error: 'Code must be a string.' }
    ).optional(),
    price: z.number({
        invalid_type_error: 'Price must be a number.'
    }).nonnegative().optional()
});

export default priceZodSchema;