import Promise from "../models/Promise.js";

export const createPromise = async (req, res, next) => {
  const newPromise = new Promise(req.body);
  try {
    const savedPromise = await newPromise.save();
    res.status(200).json(savedPromise);
  } catch (err) {
    next(err);
  }
};
export const updatePromise = async (req, res, next) => {
  try {
    const updatedPromise = await Promise.findByIdAndUpdate(
      req.params.id,
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
    await Promise.findByIdAndDelete(req.params.id);
    res.status(200).json("Promise has been deleted");
  } catch (err) {
    next(err);
  }
};
export const getPromise = async (req, res, next) => {
  try {
    const promise = await Promise.findById(req.params.id);
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
