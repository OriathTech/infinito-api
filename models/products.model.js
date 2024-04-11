import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    priceCode: {
        type: String,
        default: ""
    },
    line: {
        type: String,
        enum: [],
        default: ""
    },
    style: {
        type: String,
        enum: [],
        default: ""
    },
    size: {
        type: String,
        enum: [],
        default: ""
    },
    shape: {
        type: String,
        enum: [],
        default: ""
    },
    finnish: {
        type: String,
        enum: [],
        default: ""
    },
    color: {
        type: [{
            type: String,
            enum: []
        }],
        default: []
    },
    thumbnail: {
        type: String,
        default: ""
    }
})

const productModel = model("products", productSchema);

export default productModel;