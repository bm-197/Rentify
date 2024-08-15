import { Signup } from "../models/SignupModel.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const AuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).send("Token not found, please login again.");
  };

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await Signup.findById(decoded.id);

    if (!user) {
      return res.status(400).send("User not found.");
    }

    req.user = user;
  } catch (err) {
    return res.status(401).send("Unauthorized acess, token is invalid or expired");
  }
  next();
};