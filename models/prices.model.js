import { Schema, model } from "mongoose";

const priceSchema = new Schema({
    reference: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
})

const priceModel = model("prices", priceSchema);

export default priceModel;