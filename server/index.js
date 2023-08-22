import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (err) {
    throw err;
  }
};

app.get("/", (req, res) => {
  res.send("hello app");
});

app.listen(8800, () => {
  connect();
  console.log("connected to backend");
});
