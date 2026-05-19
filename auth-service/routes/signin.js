import express from "express";
import { compare } from "bcrypt";
import User from "../models/user.model.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user === null)
      return res.status(400).json({ message: "Invalid email or password" });

    const validPassword = await compare(password, user.password);

    if (validPassword === false)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = user.generateAuthToken();

    res.status(200).json({ token: token });
  } catch (error) {
    next(error);
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const currentUser = await User.findById(userId).select("-password");

    if (currentUser === null)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(currentUser);
  } catch (error) {
    next(error);
  }
});

export default router;
