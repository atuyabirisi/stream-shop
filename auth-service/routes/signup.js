import express from "express";
import lodash from "lodash";
import User from "../models/user.model.js";
import { genSalt, hash } from "bcrypt";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "User already registered" });

    user = new User(lodash.pick(req.body, ["username", "email", "password"]));
    const salt = await genSalt(10);

    user.password = await hash(user.password, salt);

    await user.save();

    res.status(201).json({
      message: "User successfully registered",
      user: lodash.pick(user, ["email"]),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
