import { Product } from "../models/productModel";

export const postOneProduct = (req, res) => {
  try {
    const newProduct = new Product(req.body);
    newProduct.save();
    return res.status(200).json({ message: "Berhasil" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const allProduct = await Product.find();
    console.log("allProduct ->" + allProduct);
    return res.status(200).json(allProduct);
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};

