import * as rep from "../repositories/repositories.js"
import * as zod from "../utils/zod/validations.js"
import userModel from "../models/users.model.js"
import userZodSchema from "../utils/zod/schemas/user.zodSchema.js"
import { comparePassword, createHash } from "../utils/bcrypt/bcrypt.js"
import { sendConfirmationMail, sendResetMail } from "../utils/nodemailer/nodemailer.js"
import jwt from 'jsonwebtoken';


export const loginUser = async (info) => {
    try {
        const validatedInfo = zod.validateRequiredInfo(userZodSchema, info, ["email, password"]);

        if(!validatedInfo.success) {
            return {
                status: "error",
                error: validatedInfo.error.issues
            }
        }

        const user = await rep.findOneByFilter(userModel, {email: validatedInfo.data.email});

        if (!user || !comparePassword(validatedInfo.data.password, user.password)) {
            return {
                status: "error",
                error: "Email o contraseña incorrecta"
            }
        }

        const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '3h' });

        return {
            token: token,
            payload: user
        }

    } catch (error) {
        throw error
    }
}

export const createConfirmationToken = async (info) => {
    try {
        const validatedInfo = zod.validateRequiredInfo(userZodSchema, info, ["email, password", "cellphone", "name", "surname"]);

        if(!validatedInfo.success) {
            return {
                status: "error",
                error: validatedInfo.error.issues
            }
        }

        const hashPassword = createHash(validatedInfo.data.password);

        const newUser = {
            email: validatedInfo.data.email,
            password: hashPassword,
            cellphone: validatedInfo.data.cellphone,
            name: validatedInfo.data.name,
            surname: validatedInfo.data.surname
        }

        const token = jwt.sign(newUser , process.env.JWT_SECRET, { expiresIn: '3h' });

        await sendConfirmationMail(token, validatedInfo.data.email);

    } catch (error) {
        throw error;
    }
}

export const registerUser = async (confirmationToken) => {
    try {
        const info = jwt.verify(confirmationToken, process.env.JWT_SECRET);

        const validatedInfo = zod.validateRequiredInfo(userZodSchema, info, ["email, password", "cellphone", "name", "surname"]);

        if(!validatedInfo.success) {
            return {
                status: "error",
                error: validatedInfo.error.issues
            }
        }

        const user = await rep.createOne(userModel, validatedInfo.data);

        const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '3h' });

        return {
            token: token,
            payload: user
        }

    } catch (error) {
        throw error;
    }
}

export const createResetPasswordToken = async (info) => {
    try {
        const validatedInfo = zod.validateRequiredInfo(userZodSchema, info, ["email"]);

        if(!validatedInfo.success) {
            return {
                status: "error",
                error: validatedInfo.error.issues
            }
        }

        const user = await rep.findOneByFilter(userModel, {email: validatedInfo.data.email});

        if (!user) {
            return {
                status: "error",
                error: "El usuario no esta registrado."
            }
        }

        const token = jwt.sign({email: user.email} , process.env.JWT_SECRET, { expiresIn: '3h' });

        await sendResetMail(token, user.email);

    } catch (error) {
        throw error;
    }
}

export const updateUserPassword = async (info) => {
    try {
        const token = jwt.verify(info.resetToken, process.env.JWT_SECRET);
        const user = await rep.findOneByFilter(userModel, {email: token.email});

        if (info.password !== info.repeatPassword) {
            return {
                status: "error",
                error: "Las contraseñas no coinciden."
            }
        }

        const newPassword = createHash(info.password);

        const updatedUser = await rep.updateOneById(userModel, user._id, {password: newPassword});

        return {
            status: "success",
            payload: updatedUser
        }

    } catch (error) {
        throw error
    }
}