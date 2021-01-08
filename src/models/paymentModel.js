import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  idUser: {
    type: String,
    required: true,
  },
  listProduct: [
    {
      idProduct: {
        type: String,
        required: true,
      },
      qtyProduct: {
        type: Number,
        required: true,
      },
    },
  ],
  creditCardCode: {
    type: String,
    required: true,
  },
  ccvNumberHash: {
    type: String,
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
});

export const Payment = mongoose.model("Payment", PaymentSchema);

