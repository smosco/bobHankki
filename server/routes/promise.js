import express from "express";

import {
  createPromise,
  deletePromise,
  getPromise,
  updatePromise,
  getPromises,
} from "../controllers/promise.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:userId", verifyUser, createPromise);
//UPDATE
router.put("/:promiseId/:userId", verifyUser, updatePromise);
//DELETE
router.delete("/:promiseId/:userId", verifyUser, deletePromise);
//GET
router.get("/:promiseId", getPromise);
//GET ALL
router.get("/", getPromises);
//GET BY DISTANCE

export default router;
