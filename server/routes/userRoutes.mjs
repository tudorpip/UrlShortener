import express from "express";
import {
  getAllUsers,
  createUser,
  attemptAuthentification,
  verifyToken,
  createNewToken,
  deleteToken,
} from "../controllers/userController.mjs";
const router = express.Router();

router.get("/", getAllUsers);

router.post("/create", createUser);

router.post("/login", attemptAuthentification);
router.get("/protected", verifyToken, (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
router.post("/token", createNewToken);
router.delete("/token/:token", deleteToken);
export default router;