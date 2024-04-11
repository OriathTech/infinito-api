import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  products: {
    type: [
      {
        name: {
          type: String,
          required: true
        },
        size: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        totalPrice: {
          type: Number,
          required: true
        }
      }
    ],
    default: []
  },
  deliberyFee: {
    type: Number,
    default: 0
  },
  reference: {
    type: String,
    default: ""
  },
  purchaseDate: {
    type: String,
    enum: [],
    default: ""
  },
  expitarionDate: {
    type: String,
    enum: [],
    default: ""
  }

})

const ticketModel = model("tickets", ticketSchema);

export default ticketModel;