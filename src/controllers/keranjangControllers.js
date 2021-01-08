import { Keranjang } from "../models/keranjangModel";

export const getAllCart = (req, res, next) => {
  Keranjang.findOne({ idUser: req.user._id })
    .then((cart) => res.status(200).json(cart.listProduct))
    .catch((err) => console.log(err));
};

export const addToCart = (req, res) => {
  const product = req.body;
  Keranjang.findOne({ idUser: req.user._id })
    .then((cart) => {
      const cartProductIndex = cart.listProduct.findIndex((cartProduct) => {
        return cartProduct.idProduct.toString() === product._id.toString();
      });

      let newQuantity = 1;
      const updatedCartItems = [...cart.listProduct];

      if (cartProductIndex >= 0) {
        newQuantity = cart.listProduct[cartProductIndex].qtyProduct + 1;
        updatedCartItems[cartProductIndex].qtyProduct = newQuantity;
      } else {
        updatedCartItems.push({
          idProduct: product._id,
          qtyProduct: newQuantity,
        });
      }

      cart.listProduct = updatedCartItems;
      res.status(200).json("Ok");
      return cart.save();
    })
    .catch((err) => console.log(err));
};

export const removeFromCart = (req, res) => {
  const idProduct = req.body._id;

  Keranjang.findOne({ idUser: req.user._id })
    .then((cart) => {
      const updatedCartItems = cart.listProduct.filter(
        (item) => item.idProduct.toString() !== idProduct.toString()
      );

      cart.listProduct = updatedCartItems;
      res.status(200).json("Ok");
      return cart.save();
    })
    .catch((err) => console.log(err));
};

