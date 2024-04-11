import * as serv from "../services/sessions.services.js"

export const getSession = async (req, res, next) => {
    const user = req.user;
    if (user) {
        return res.status(200).json({
            status: "success",
            message: "Se ha encontrado los datos de la sesión.",
            payload: user
        });
    }

    return res.status(400).json({
        status: "error",
        message: "No se ha podido encontrar los datos de la sesión.",
        error: "Hubo un problema en el servidor."
    });
}

export const postLogin = async (req, res, next) => {
    const info = req.body;

    try {
        const response = await serv.loginUser(info);

        if (response.status === "error") {
            return res.status(422).json({
                status: "error",
                message: "Error de validación.",
                error: response.error
            });
        }
        
        res.cookie('jwt', response.token, { httpOnly: false, maxAge: 3 * 60 * 60 * 1000, sameSite: 'None', secure: true });
        return res.status(200).json({
            status: "success",
            message: "Estas logeado.",
            payload: response.user
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Ocurrio un error en el login.",
            error: error.message
        });
    }
}

export const postRegister = async (req, res, next) => {
    const info = req.body;

    try {
        const response = await serv.createConfirmationToken(info);

        if (response.status === "error") {
            return res.status(422).json({
                status: "error",
                message: "Error de validación.",
                error: response.error
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Se ha enviado el correo de confirmacíon.",
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Ha ocurrido un problema en el servidor.",
            error: error.message
        });
    }
}

export const postRegisterConfirmation = async (req, res, next) => {
    const info = req.body;
    try {
        const response = await serv.registerUser(info);

        if (response.status === "error") {
            return res.status(422).json({
                status: "error",
                message: "Error de validación.",
                error: response.error
            });
        }
        
        res.cookie('jwt', response.token, { httpOnly: false, maxAge: 3 * 60 * 60 * 1000, sameSite: 'None', secure: true });
        return res.status(200).json({
            status: "success",
            message: "Te has registrado correctamente.",
            payload: response.user
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Ocurrió un error en el registro.",
            error: error.message
        });
    }
}

export const postForgotPassword = async (req, res, next) => {
    const info = req.body;
    try {
        const response = await serv.createResetPasswordToken(info);

        if (response.status === "error") {
            return res.status(422).json({
                status: "error",
                message: "Error de validación.",
                error: response.error
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Se ha enviado el email de recuperación correctamente."
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se ha podido enviar el mail de recuperación.",
            error: error.message
        });
    }
}

export const postResetPassword = async (req, res, next) => {
    const info = req.body;
    try {
        const response = await serv.updateUserPassword(info);

        if (response.status === "error") {
            return res.status(422).json({
                status: "error",
                message: "Error de validación.",
                error: response.error
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Se ha actualizado la contraseña.",
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se ha podido actualizar la contraseña.",
            error: error.message
        });
    }
}