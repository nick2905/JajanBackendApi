import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    noTelp: {
        type: Number,
        required: true
    },
    isPhoneVerify:{
        type: Boolean,
        default: false
    },
    birthDate: {
        type: Date,
        required: false
    },
    hashPassword: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// UserSchema.methods.comparePassword = (password, hashPassword) => {
//     return bcrypt.compareSync(password, hashPassword);