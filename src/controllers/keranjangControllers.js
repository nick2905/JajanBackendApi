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

//Belum di Test
export const addToCart = (req, res) => {
    try {
        const newKeranjang = new Keranjang(req.body);

        const findKeranjangUser = Keranjang.find({
            idUser: req.body.idUser
        }, (err, keranjang) => {
            if (err) throw err;
            if (!keranjang) {
                newKeranjang.save((err) => {
                    if (err) throw err;
                    return res.status(200).json(keranjang, { message: 'Successfull Add To Keranjang' });
                })
            } else if (keranjang) {
                return res.status(200).json({ message: 'Produk Sudah Ada Di Keranjang' });
            }
        });
    } catch (error) {
        return res.status(401).json(error);
    }
}

//Belum di test
export const addReduceQtyProduct = (req, res) => {
    try {
        if (req.body.status === "add") {
            const data = Keranjang.findOneAndUpdate({
                idUser: req.body.idUser,
                "listProduct.idProduct": req.body.idProduct
            }, {
                $inc: {
                    "listProduct.$.qtyProduct": +1
                }
            });
            return res.status(200).json(data);
        } else if (req.body.status === "reduce") {
            const data = Keranjang.findOneAndUpdate({
                idUser: req.body.idUser,
                "listProduct.idProduct": req.body.idProduct
            }, {
                $inc: {
                    "listProduct.$.qtyProduct": -1
                }
            });
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(401).json(error);
    }
}

export const removeFromCart = (req, res) => {
    try {
        const findKeranjangUser = Keranjang.findOneAndUpdate({
            idUser: req.body.idUser
        }, {
            $pull: {
                "listProduct.$.idProduct": req.body.idProduct
            }
        });
        console.log("Find Keranjang ->" + findKeranjangUser);
        return res.status(200).json(findKeranjangUser);
    } catch (error) {
        return res.status(401).json(error)
    }
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