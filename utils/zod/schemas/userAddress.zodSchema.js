import { z } from "zod";

const userAddressZodSchema = z.object({
    province: z.string(
        {invalid_type_error: 'Province must be a string.'}
    ).optional(),
    locality: z.string(
        {invalid_type_error: 'Locality must be a string.'}
    ).optional(),
    postalCode: z.number({
        invalid_type_error: 'Postal Code must be a number.'
    }).nonnegative().optional(),
    street: z.string(
        {invalid_type_error: 'Street must be a string.'}
    ).optional(),
    streetNumber: z.number({
        invalid_type_error: 'Street Number must be a number.'
    }).nonnegative().optional(),
    floor: z.string(
        {invalid_type_error: 'Floor must be a string.'}
    ).optional(),
    apartment: z.string(
        {invalid_type_error: 'Apartment must be a string.'}
    ).optional(),
    observations: z.string(
        { invalid_type_error: 'Observatiosn must be a string.' }
    ).max(80,
        { message: "Must be 80 or fewer characters long" }
    ).optional()
});

export default userAddressZodSchema;