import { Schema, model } from "mongoose";
import * as e from "../utils/enums/enums";

const filterSchema = new Schema({
    lines: {
        type: [{
            type: String,
            enum: [e.lines]
        }],
        default: [],
        required: true
    },
    styles: {
        type: [{
            type: String,
            enum: [e.styles]
        }],
        default: [],
        required: true
    },
    sizes: {
        type: [{
            type: String,
            enum: [e.sizes]
        }],
        default: [],
        required: true
    },
    shapes: {
        type: [{
            type: String,
            enum: [e.shapes]
        }],
        default: [],
        required: true
    },
    colors: {
        type: [{
            type: String,
            enum: [e.colors]
        }],
        default: [],
        required: true
    }
})

const filterModel = model("prices", filterSchema);

export default filterModel;