import express from "express";
import {
  getAllUsers,
  createUser,
  attemptAuthentification,
} from "../controllers/userController.mjs";
const router = express.Router();

router.get("/", getAllUsers);

router.post("/create", createUser);

router.post("/login", attemptAuthentification);

export default router;
