import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  nameProduct: {
    type: String,
    required: true,
  },
  priceProduct: {
    type: Number,
    required: true,
  },
  imgPath: {
    type: String,
    default: "",
  },
});

export const Product = mongoose.model("Product", ProductSchema);

