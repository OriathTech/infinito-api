import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  products: {
    type: [
      {
        name: {
          type: String,
          required: true
        },
        width: {
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
        },
        unitaryPrice: {
          type: Number,
          required: true
        }
      }
    ],
    default: []
  },
  status: {
    type: Boolean,
    default: false
  },
  deliberyFee: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: String,
    enum: [],
    default: ""
  }
})

const ticketModel = model("tickets", ticketSchema);

export default ticketModel;