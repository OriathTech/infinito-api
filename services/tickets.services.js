import * as rep from "../repositories/repositories.js"
import * as zod from "../utils/zod/validations.js"

import userModel from "../models/users.model.js"
import ticketModel from "../models/tickets.model.js"
import productModel from "../models/products.model.js"
import priceModel from "../models/prices.model.js"

import cartZodSchema from "../utils/zod/schemas/cart.zodSchema.js"

import client from "../config/mercadoPago/mercadoPago.js"
import { Preference } from "mercadopago"

export const findTickets = async () => {
    try {
        const tickets = await rep.findAll(userModel);

        return tickets;

    } catch (error) {
        throw error;
    }
}

export const findTicketsById = async (uid) => {
    try {
        const tickets = await rep.findAll(userModel, { userId: uid })

        return tickets;

    } catch (error) {
        throw error;
    }
}

export const createTicket = async (user, info) => {
    try {
        const validatedInfo = zod.validateRequiredInfo(cartZodSchema, info, ["products", "deliveryFee"]);

        if (!validatedInfo.success) {
            return {
                status: "error",
                error: validatedInfo.error.issues
            }
        }

        const pricesInfo = await rep.findAll(priceModel);
        let totalPrice = 0

        const productPromises = validatedInfo.data.products.map(async (cartItem) => {
            const product = await rep.findOneById(productModel, cartItem.productId);

            if (!product) {
                throw new Error(`Producto con _id ${cartItem.productId} no existe`);
            }

            const priceTier = pricesInfo.find((price) => price.code === product.priceCode);

            const productPrice = priceTier.price * cartItem.quantity;
            totalPrice += productPrice;

            return {
                name: product.name,
                quantity: cartItem.quantity,
                width: product.width,
                unitaryPrice: priceTier.price,
                totalPrice: productPrice
            };
        });

        const validatedCart = await Promise.all(productPromises);
        const dateNow = "date"


        const ticketInfo = {
            userId: user._id,
            products: validatedCart,
            status: false,
            deliberyFee: validatedInfo.data.deliveryFee,
            total: totalPrice,
            purchaseDate: dateNow
        }

        const ticket = await rep.createOne(ticketModel, ticketInfo);

        const items = validatedCart.map((item) => {
            return {
                id: item._id,
                title: item.name,
                quantity: item.quantity,
                unit_price: item.unitaryPrice,
                currency_id: "ARS"
            }
        })

        const body = {
            items: items,
            payer: {
                name: user.name,
                surname: user.surname,
                email: user.email,
                phone: {
                    area_Code: 11,
                    number: user.cellphone
                }
            },
            back_urls: {
                success: "pagina de terminar compra con token como param con id del ticket",
                failure: "url de la pagina"
            },
            payment_methods: {
                excluded_payment_types: [
                    {
                        id: "ticket"
                    }
                ],
                installments: 1
            },
            statement_descriptor: "Infinito Nails",
            external_reference: ticket._id,
            date_of_expiration: "date"
        }

        const preference = new Preference(client);
        const result = await preference.create({ body })

        return {
            status: "success",
            payload: result.id
        }


    } catch (error) {
        throw error
    }
}


export const updateTicketById = async (tid, info) => {
    try {
        const ticketStatus = !info.status;

        const updatedTicket = await rep.updateOneById(ticketModel, tid, { status: ticketStatus })

        return {
            status: "success",
            payload: updatedTicket
        };

    } catch (error) {
        throw error;
    }
}

export const deleteTicketById = async (tid) => {
    try {
        const deletedTicket = await rep.deleteOneById(tid);

        return deletedTicket;

    } catch (error) {
        throw error;
    }
}