import * as serv from "../services/users.services.js"

export const getUsers = async (req, res, next) => {
    try {
        const response = await serv.findUsers();

        return res.status(200).json({
            status: "success",
            message: "Se han encontrado los elementos.",
            payload: response
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se han podido encontrado los elementos.",
            error: error.message
        });
    }
}

export const putUser = async (req, res, next) => {
    const info = req.body;
    const uid = req.user._id;
    try {
        const response = await serv.updateUserById(uid, info);

        if (response.status === "error") {
            return res.status(422).json({
                status: "error",
                message: "Error de validación.",
                error: response.error
            });
        }

        return res.status(200).json({
            status: "success",
            message: "El elemento se ha actualizado.",
            payload: response.payload
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se ha podido actualizar el elemento.",
            error: error.message
        });
    }
}

export const deleteUser = async (req, res, next) => {
    const uid = req.params.uid;
    try {
        const response = await serv.deleteUserById(uid);

        return res.status(200).json({
            status: "success",
            message: `El usuario ha sido eliminado.`,
            payload: response
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "El usuario no se ha podido eliminar.",
            error: error.message
        });
    }
}