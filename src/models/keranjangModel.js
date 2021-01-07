import mongoose from "mongoose";

const Schema = mongoose.Schema;

const keranjangSchema = new Schema({
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
});

export const Keranjang = mongoose.model("Keranjang", keranjangSchema);

