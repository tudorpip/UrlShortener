import express from "express";
import { getURL, getAllURLs, createURL } from "../services/urlService.mjs";
import { verifyToken } from "../services/userService.mjs";

const router = express.Router();

router.get("/", verifyToken, getAllURLs);

router.get("/:id", getURL);

router.post("/", verifyToken, createURL);

export default router;
