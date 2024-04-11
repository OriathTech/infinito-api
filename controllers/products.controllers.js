import * as serv from "../services/products.services.js"

export const getProducts = async (req, res, next) => {
    try {
        const response = await serv.findProducts();

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

export const getProduct = async (req, res, next) => {
    const pid = req.params.pid;
    try {
        const response = await serv.findProductById(pid);
        
        return res.status(200).json({
            status: "success",
            message: "Se ha encontrado el elemento.",
            payload: response
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se ha podido encontrar el elemento.",
            error: error.message
        });
    }
}

export const postProduct = async (req, res, next) => {
    const info = req.body;
    try {
        const response = await serv.createProduct(info);

        if (response.status === "error") {
            return res.status(422).json({
                status: "error",
                message: "Error de validación.",
                error: error.message
            });
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

export const putProduct = async (req, res, next) => {
    const info = req.body;
    const pid = req.params.pid;
    try {
        const response = await serv.updateProductById(pid, info);

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

export const putProductThumbnail = async (req, res, next) => {
    const info = req.body;
    const pid = req.params.pid;
    try {
        const response = await serv.updateProductById(pid, info);

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

export const deleteProduct = async (req, res, next) => {
    const pid = req.params.pid;
    try {
        const response = await serv.deleteProductById(pid);

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