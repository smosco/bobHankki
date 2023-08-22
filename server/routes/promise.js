import express from "express";

import {
  createPromise,
  deletePromise,
  getPromise,
  updatePromise,
  getPromises,
} from "../controllers/promise.js";

const router = express.Router();

//CREATE
router.post("/", createPromise);
//UPDATE
router.put("/:id", updatePromise);
//DELETE
router.delete("/:id", deletePromise);
//GET
router.get("/:id", getPromise);
//GET ALL
router.get("/", getPromises);
//GET BY DISTANCE

export default router;
