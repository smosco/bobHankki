import Promise from "../models/Promise.js";
import User from "../models/User.js";

export const createPromise = async (req, res, next) => {
  const newPromise = new Promise(req.body);
  try {
    const savedPromise = await newPromise.save();
    try {
      await User.findByIdAndUpdate(req.user.userId, {
        $push: { promises: savedPromise._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedPromise);
  } catch (err) {
    next(err);
  }
};
export const updatePromise = async (req, res, next) => {
  try {
    const updatedPromise = await Promise.findByIdAndUpdate(
      req.params.promiseId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPromise);
  } catch (err) {
    next(err);
  }
};
export const deletePromise = async (req, res, next) => {
  try {
    await Promise.findByIdAndDelete(req.params.promiseId);
    res.status(200).json("Promise has been deleted");
    try {
      await User.findByIdAndUpdate(req.user.userId, {
        $pull: { promises: req.params.promiseId },
      });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
export const getPromise = async (req, res, next) => {
  try {
    const promise = await Promise.findById(req.params.promiseId);
    res.status(200).json(promise);
  } catch (err) {
    next(err);
  }
};

export const getPromises = async (req, res, next) => {
  try {
    const promises = await Promise.find();
    res.status(200).json(promises);
  } catch (err) {
    next(err);
  }
};
