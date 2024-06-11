import express from "express";
import {
  getURL,
  getAllURLs,
  createURL,
} from "../controllers/urlController.mjs";

const router = express.Router();

router.get("/", getAllURLs);

router.get("/redirect/:id", getURL);

router.post("/create-url", createURL);

export default router;
