import { z } from "zod";
import { lineEnum, styleEnum, sizeEnum, shapeEnum, finnishEnum, colorEnum } from "../../enums/enums.js";

const productZodSchema = z.object({
    name: z.string(
        { invalid_type_error: 'Product name must be a string.' }
    ).max(25,
        { message: "Must be 25 or fewer characters long" }
    ).optional(),
    priceCode: z.string(
        { invalid_type_error: 'PriceCode name must be a string.' }
    ).optional(),
    line: z.enum(lineEnum,
        { invalid_type_error: 'Line must be a string of enum category.' }
    ).optional(),
    style: z.enum(styleEnum,
        { invalid_type_error: 'Style must be a string of enum category.' }
    ).optional(),
    size: z.enum(sizeEnum,
        { invalid_type_error: 'Size must be a string of enum category.' }
    ).optional(),
    shape: z.enum(shapeEnum,
        { invalid_type_error: 'Shape must be a string of enum category.' }
    ).optional(),
    finnish: z.enum(finnishEnum,
        { invalid_type_error: 'Finnish must be a string of enum category.' }
    ).optional(),
    color: z.array(
        z.enum(colorEnum)
    ).optional(),
    thumbnail: z.string(
        { invalid_type_error: 'Thumbnail must be a string.' }
    ).optional()
});

export default productZodSchema;