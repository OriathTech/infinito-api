import { z } from "zod";


const cartZodSchema = z.object({
    products: z.array(z.object(
        {
            productId: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
                message: 'Id must be a valid ObjectId.',
            }),
            name: z.string(
                { invalid_type_error: 'Product name must be a string.' }
            ).max(25,
                { message: "Must be 25 or fewer characters long" }
            ),
            width: z.number({
                invalid_type_error: 'Width must be a number in mm.'
            }).nonnegative(),
            price: z.number({
                invalid_type_error: 'Product price must be a number.'
            }).nonnegative(),
            quantity: z.number().int().gte(1)
        }
    )),
    deliveryFee: z.number({
        invalid_type_error: 'Price must be a number.'
    }).nonnegative(),
});

export default cartZodSchema;