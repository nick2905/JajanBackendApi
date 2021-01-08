import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  noTelp: {
    type: Number,
    required: true,
  },
  isPhoneVerify: {
    type: Boolean,
    default: false,
  },
  birthDate: {
    type: Date,
    required: false,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", UserSchema);

