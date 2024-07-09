import express from "express";
import {
  register,
  login,
  checkActiveToken,
  logout,
} from "../services/userService.mjs";
import { verifyToken } from "../middleware/verifyToken.mjs";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/validate-token", verifyToken, checkActiveToken);
export default router;
