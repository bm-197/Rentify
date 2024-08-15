import mongoose from "./../utils/db.js";
import bcrypt from "bcrypt";


const SignupSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  phone: String,
  password: String,
  confirmPassword: String,
  role: { type: String, default: "user" },
  status: { type: String, default: "active" },
  profilePic: { type: String, default: "profilePic.png" },
});

SignupSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

SignupSchema.methods.checkPasswordMatch = async function (password, candidatePassword) {
  return await bcrypt.compare(password, candidatePassword);
};

export const Signup = mongoose.model("users", SignupSchema);
