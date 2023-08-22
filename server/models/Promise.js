import mongoose from "mongoose";

const PromiseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    menu: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
    },
    cost: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String],
    },
    desc: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      defulat: "l",
    },
    author: {
      type: String,
      required: true,
    },
    mate: {
      type: String,
    },
  },
  { timeStamps: true }
);

export default mongoose.model("Promise", PromiseSchema);
