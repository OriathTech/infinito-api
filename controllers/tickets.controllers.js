import * as serv from "../services/tickets.services.js"

export const getTickets = async (req, res, next) => {
    const uid = req.params.uid
    try {
        const response = await serv.findTicketsById(uid);

        return res.status(200).json({
            status: "success",
            message: "Se han enconrado los elementos.",
            payload: response
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se han podido encontrar los elementos.",
            error: error.message
        });
    }
}

export const postTicket = async (req, res, next) => {
    const info = req.body;
    const user = req.user;
    try {
        const response = await serv.createTicket(user, info);

        if (response.status === "error") {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                error: response.error
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Se ha creado el elemento.",
            payload: response.payload
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se ha podido crear el elemento.",
            error: error.message
        });
    }
}

export const postPreference = async (req, res, next) => {
    const info = req.body;
    const user = req.user;
    try {
        const response = await serv.createPreference(user, info);

        if (response.status === "error") {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                error: response.error
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Se ha creado el elemento.",
            payload: response.payload
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se ha podido crear el elemento.",
            error: error.message
        });
    }
}