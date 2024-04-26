import * as rep from "../repositories/repositories.js"
import * as zod from "../utils/zod/validations.js"
import priceModel from "../models/prices.model.js"
import priceZodSchema from "../utils/zod/schemas/prices.zodSchema.js";



export const findPrices = async () => {
    try {
        const prices = await rep.findAll(priceModel);

        return prices;

    } catch (error) {
        throw error;
    }
}

export const updatePriceById = async (pid, info) => {
    try {
        const validatedInfo = zod.validateInfo(priceZodSchema, info);

        if(!validatedInfo.success) {
            return {
                status: "error",
                error: validatedInfo.error.issues
            }
        }

        const updatedPrice = await rep.updateOneById(priceModel, pid, validatedInfo.data);

        return {
            status: "sucess",
            payload: updatedPrice,
            reload: true
        }

    } catch (error) {
        throw error;
    }
}