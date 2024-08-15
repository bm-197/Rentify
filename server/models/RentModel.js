import mongoose from "../utils/db.js";

const rentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  phone: String,
  profilePic: String,
  carPhoto: String,
  model: String,
  mark: String,
  price: String,
  pickDate: String,
  pickTime: String,
  dropDate: String,
  dropTime: String,
  carId: String,
  status: { type: String, default: "Taken" },
});

export const Rent = mongoose.model("rent", rentSchema);