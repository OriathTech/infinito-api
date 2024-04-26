import * as rep from "../repositories/repositories.js"
import * as zod from "../utils/zod/validations.js"
import userModel from "../models/users.model.js"
import userAddressZodSchema from "../utils/zod/schemas/userAddress.zodSchema.js"

export const findUsers = async () => {
    try {
        const users = await rep.findAll(userModel);

        return users;

    } catch (error) {
        throw error;
    }
}

export const findUserById = async (uid) => {
    try {
        const user = await rep.findOneById(userModel, uid);

        return user;

    } catch (error) {
        throw error;
    }
}

export const updateUserById = async (uid, info) => {
    try {
        const validatedInfo = zod.validateRequiredInfo(userAddressZodSchema, info, ["province", "locality", "postalCode", "street", "streetNumber"]);

        if(!validatedInfo.success) {
            return {
                status: "error",
                error: validatedInfo.error.issues
            }
        }

        const updatedUser = await rep.updateOneById(userModel, uid, validatedInfo.data);

        return {
            status: "success",
            payload: updatedUser
        }

    } catch (error) {
        throw error;
    }
}

export const deleteUserById = async (uid) => {
    try {
        const deletedUser = await rep.deleteOneById(uid);

        return deletedUser;

    } catch (error) {
        throw error;
    }
}