import { Schema, model } from "mongoose";
import * as e from "../utils/enums/enums";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    priceCode: {
        type: String,
        required: true
    },
    line: {
        type: String,
        enum: [e.lines],
        required: true
    },
    style: {
        type: String,
        enum: [e.styles],
        required: true
    },
    size: {
        type: String,
        enum: [e.sizes],
        required: true
    },
    shape: {
        type: String,
        enum: [e.shapes],
        required: true
    },
    finnish: {
        type: String,
        enum: [e.finishes],
        required: true
    },
    color: {
        type: [{
            type: String,
            enum: [e.colors]
        }],
        required: true
    },
    thumbnail: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["online", "offline", "featured"],
        default: "online"
    }
})

const productModel = model("products", productSchema);

export default productModel;