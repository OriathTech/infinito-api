import * as serv from "../services/prices.services.js"

export const getPrices = async (req, res, next) => {
    try {
        const response = await serv.findPrices();
        
        return res.status(200).json({
            status: "success",
            message: "Se han encontrado los elementos.",
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

export const putPrice = async (req, res, next) => {
    const info = req.body;
    const pid = req.params.pid;

    try {
        const response = await serv.updatePriceById(pid, info);

        if (response.status === "error") {
            return res.status(422).json({
                status: "error",
                message: "Error de Validación.",
                error: response.error
            });
        }
        
        return res.status(200).json({
            status: "success",
            message: "Se ha actualizado el elemento.",
            payload: response.payload,
            reload: response.reload
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se ha podido actualizar el elemento.",
            error: error.message
        });
    }
}