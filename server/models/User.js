import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    location: {
      lat: { type: Number },
      lng: { type: Number },
      required: true,
    },
    address: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    birth: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    promises: {
      type: [String],
    },
    chat: {
      type: [String],
    },
    email: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true }
);

export default mongoose.model("User", UserSchema);
