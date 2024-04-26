import * as rep from "../repositories/repositories.js"
import * as zod from "../utils/zod/validations.js"
import productModel from "../models/products.model.js"
import priceModel from "../models/prices.model.js"
import filterModel from "../models/filters.model.js"
import productZodSchema from "../utils/zod/schemas/product.zodSchema.js"

export const findProducts = async () => {
    try {
        const products = await rep.findAll(productModel);
        const filters = await rep.findAll(filterModel);

        const productsWithPrices = await setPrices(products, prices);

        return {
            status: "success",
            payload: {
                products: productsWithPrices,
                filters: filters
            }
        }

    } catch (error) {
        throw error;
    }
}

export const findProductById = async (pid) => {
    try {
        const product = await rep.findOneById(productModel, pid);

        return product;

    } catch (error) {
        throw error;
    }
}

export const createProduct = async (info) => {
    try {
        const validatedInfo = zod.validateRequiredInfo(productZodSchema, info, ["name", "priceCode", "line", "style", "size", "shape", "finnish", "color"]);

        if (!validatedInfo.success) {
            return {
                status: "error",
                error: validatedInfo.error.issues
            }
        }

        const newProduct = await rep.createOne(productModel, validatedInfo.data);
        const newProductWithPrice = await setPrice(newProduct);

        await setFilters();

        return {
            status: "success",
            payload: newProductWithPrice
        }

    } catch (error) {
        throw error;
    }
}

export const updateProductById = async (pid, info) => {
    try {
        const validatedInfo = zod.validateInfo(productZodSchema, info);

        if (!validatedInfo.success) {
            return {
                status: "error",
                error: validatedInfo.error.issues
            }
        }

        const updatedProduct = await rep.updateOneById(productModel, pid, validatedInfo.data);
        const updatedProductWithPrice = await setPrice(updatedProduct);

        await setFilters();

        return {
            status: "sucess",
            payload: updatedProductWithPrice
        }

    } catch (error) {
        throw error;
    }
}

export const updateProductThumbnail = async (pid, info) => {
    try {
        const validatedInfo = zod.validateRequiredInfo(productZodSchema, info, ["thumbnail"]);

        if (!validatedInfo.success) {
            return {
                status: "error",
                error: validatedInfo.error.issues
            }
        }

        const updatedProduct = await rep.updateOneById(productModel, pid, { thumbnail: validatedInfo.data.thumbnail })

        return {
            status: "error",
            payload: updatedProduct
        }

    } catch (error) {
        throw error;
    }
}

export const deleteProductById = async (pid) => {
    try {
        const deletedProduct = await rep.deleteOneById(productModel, pid);

        await setFilters();

        return deletedProduct;

    } catch (error) {
        throw error;
    }
}

export const setFilters = async () => {
    try {
        const products = await rep.findAll(productModel);

        const uniqueFilters = {
            lines: new Set(),
            styles: new Set(),
            sizes: new Set(),
            shapes: new Set(),
            colors: new Set(),
        };

        products.forEach((product) => {
            uniqueFilters.lines.add(product.line);
            uniqueFilters.styles.add(product.style);
            uniqueFilters.sizes.add(product.size);
            uniqueFilters.shapes.add(product.shape);
            uniqueFilters.colors.add(product.color);
        });

        const filtersToUpdate = {
            lines: [...uniqueFilters.lines],
            styles: [...uniqueFilters.styles],
            sizes: [...uniqueFilters.sizes],
            shapes: [...uniqueFilters.shapes],
            colors: [...uniqueFilters.colors],
        };

        await rep.updateOneByFilter(filterModel, {}, filtersToUpdate);

    } catch (error) {
        throw error;
    }
}

export const setPrices = async (products) => {
    try {
        const prices= await rep.findAll(priceModel);
        const productsWithPrices = products.map((product) => {
            const price = prices.find((price) => price.code === product.priceCode);
            
            if (price) {
                return {
                    ...product,
                    unitaryPrice: price.price
                };
            }

            return product;
        });

        return productsWithPrices;

    } catch (error) {
        throw error;
    }
}

export const setPrice = async (product) => {
    try {
        const price= await rep.findOneByFilter(priceModel, {code: product.priceCode});

        const productWithPrice = {
            ...product,
            unitaryPrice: price.price
        };

        return productWithPrice;

    } catch (error) {
        throw error;
    }
}