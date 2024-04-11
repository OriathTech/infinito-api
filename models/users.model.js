import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cellphone: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    province: {
        type: String,
        default: ""
    },
    locality: {
        type: String,
        default: ""
    },
    postalCode: {
        type: Number,
        default: null
    },
    street: {
        type: String,
        default: ""
    },
    streetNumber: {
        type: Number,
        default: null
    },
    floor: {
        type: String,
        default: null
    },
    apartment: {
        type: String,
        default: null
    },
    observations: {
        type: String,
        default: ""
    }
})

const userModel = model("users", userSchema);

export default userModel;