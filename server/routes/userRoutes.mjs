import express from "express";
import {
  register,
  login,
  verifyToken,
  checkActiveToken,
  logout,
} from "../services/userService.mjs";
const router = express.Router();

router.post("/create", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/validate-token", verifyToken, checkActiveToken);
export default router;
