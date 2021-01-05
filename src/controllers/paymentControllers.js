import mongoose from 'mongoose';
import { KeranjangSchema } from "../models/keranjangModel";
import { PaymentSchema } from "../models/paymentModel";

const Payment = mongoose.model('Payment', PaymentSchema);
const Keranjang = mongoose.model('Keranjang', KeranjangSchema);

export const createPayment = (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        newPayment.save();
        return res.status(200).json({ message: 'Berhasil' });
    } catch (error) {
        return res.status(401).json(error);
    }
}

export const getAllPayment = (req, res) => {
    try {
        const allPayment = Payment.find({ idUser: req.params.idUser });
        return res.status(200).json(allPayment);
    } catch (error) {
        return res.status(401).json(error);
    }
}

export const getOnePayment = (req, res) => {
    try {
        const paymentDetail = Payment.findOne(req.params.idPayment);
        return res.status(200).json(paymentDetail);
    } catch (error) {
        return res.status(401).json(error);
    }
}