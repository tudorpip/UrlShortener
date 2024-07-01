import express from "express";
import {
  createUser,
  attemptAuthentification,
  verifyToken,
  getAllActiveSessions,
  checkActiveToken,
  testNanoId,
} from "../controllers/userController.mjs";
const router = express.Router();

router.post("/create", createUser);

router.post("/login", attemptAuthentification);
router.get("/tokens", getAllActiveSessions);
router.get("/protected", verifyToken, (req, res) => {
  if (req.userId) {
    res.status(200).json({ user: req.userId });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.get("/validateToken", verifyToken, checkActiveToken);
router.get("/nanoId", testNanoId);
export default router;
