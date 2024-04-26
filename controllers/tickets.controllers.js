import * as serv from "../services/tickets.services.js"

export const getTickets = async (req, res, next) => {
    try {
        const response = await serv.findTickets();

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

export const getUserTickets = async (req, res, next) => {
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

export const putTicket = async (req, res, next) => {
    const info = req.body;
    const tid = req.params.tid;
    try {
        const response = await serv.updateTicketById(tid, info);

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

export const deleteTicket = async (req, res, next) => {
    const tid = req.params.tid;
    try {
        const response = await serv.deleteProductById(tid);

        return res.status(200).json({
            status: "success",
            message: `El producto ${response.name} ha sido eliminado.`,
            payload: response
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "El elemento no se ha podido eliminar.",
            error: error.message
        });
    }
}