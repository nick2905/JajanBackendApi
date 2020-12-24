import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const KeranjangSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    listProduct: [{
        idProduct: {
            type: String,
            required: true,
        },
        qtyProduct: {
            type: Number,
            required: true
        }
    }],
});