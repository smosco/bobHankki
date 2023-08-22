import express from "express";
import {
  deleteUser,
  updateUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:userId", verifyUser, updateUser);
//DELETE
router.delete("/:userId", verifyUser, deleteUser);
//GET
router.get("/:userId", getUser);
//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
