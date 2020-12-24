import mongoose from 'mongoose';
import { KeranjangSchema } from "../models/keranjangModel";

const Keranjang = mongoose.model('Keranjang', KeranjangSchema);

export const getAllCart = (req, res) => {
    Keranjang.find({ idUser: req.body.idUser },
        (err, listProduct) => {
            if (err) throw err;
            res.status(200).json(listProduct);
        });
}

export const addToCart = (req, res) => {
    const newKeranjang = new Keranjang(req.body);

    Keranjang.findOne({ idUser: req.body.idUser }, (err, keranjang) => {
        if (err) throw err;
        if (!keranjang) {
            newKeranjang.save((err) => {
                if (err) throw err;
                res.status(200).json(keranjang, { message: 'Successfull Add To Keranjang' });
            });
        } else if (keranjang) {
            Keranjang.updateOne({ idUser: req.params.idUser }, {
                $push: { listProduct: { idProduct: req.body.idProduct, qtyProduct: req.body.qtyProduct } }
            }, (err, data) => {
                if (err) {
                    res.send(err);
                }
                console.log("Keranjang -> "+ data);
                console.log("ID Product ->" + req.body.idProduct);
                console.log("Qty Product ->" + req.body.qtyProduct);
                res.status(200).json({ message: 'Successfull Add To Keranjang' });
            });
        }
    });
}

export const removeFromCart = (req, res) => {
    Keranjang.updateOne({ idUser: req.params.idUser }, {
        $pull: { idProduct: req.body.idProduct }
    }, (err) => {
        if (err) {
            res.send(err);
        }
        res.status(200).json({ message: 'Successfull Remove From Keranjang' });
    });
}

export const editQtyFromCart = (req, res) => {
    Keranjang.updateOne({ idUser: req.params.idUser }, {
        $set: { qty: req.body.qty }
    }, (err) => {
        if (err) {
            res.send(err);
        }
        res.status(200).json({ message: 'Successfull Remove From Keranjang' });
    });
}