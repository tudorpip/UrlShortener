import express from "express";
import {
  getURL,
  getAllURLs,
  createURL,
} from "../controllers/urlController.mjs";
import { verifyToken } from "../controllers/userController.mjs";

const router = express.Router();

router.get("/", verifyToken, getAllURLs);

router.get("/:id", getURL);

router.post("/create-url", verifyToken, createURL);

export default router;
