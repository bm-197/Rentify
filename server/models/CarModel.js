import mongoose from "../utils/db.js";

const carSchema = new mongoose.Schema({
  carPhoto: String,
  mark: String,
  price: Number,
  ac: String,
  model: String,
  door: String,
  transmission: String,
  fuel: String,
  year: String,
  active: { type: Boolean, default: true },
  status: { type: String, default: "available" },
});

export const Car = mongoose.model("cars", carSchema);
