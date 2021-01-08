import { Keranjang } from "../models/keranjangModel";
import { Payment } from "../models/paymentModel";

export const createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    console.log(req.body);

    Keranjang.findOne({ idUser: req.user._id })
      .then((cart) => {
        cart.listProduct = [];
        cart.save();
      })
      .catch((err) => console.log(err));
    newPayment.save();
    return res.status(200).json({ message: "Berhasil" });
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};

export const getAllPayment = async (req, res) => {
  try {
    const allPayment = await Payment.find({ idUser: req.user._id });
    return res.status(200).json(allPayment);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const getOnePayment = async (req, res) => {
  try {
    const paymentDetail = await Payment.findOne(req.params.idPayment);
    return res.status(200).json(paymentDetail);
  } catch (error) {
    return res.status(401).json(error);
  }
};

