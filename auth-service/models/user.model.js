import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateAuthToken = function () {
  const jwtSecretKey = process.env.JWT_SECRET;

  const token = jwt.sign(
    { username: this.username, _id: this._id, isVerfied: this.isVerified },
    jwtSecretKey,
  );

  return token;
};

const User = model("User", userSchema);

export default User;
