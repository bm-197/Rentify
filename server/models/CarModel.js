import mongoose from '../utils/db.js'

const carSchema = new mongoose.Schema({
  carPhoto: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  mark: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ac: {
    type: Boolean,
    required: true,
  },
  door: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: "Available",
  }
}, { timestamps: true });


export const Car = mongoose.model("cars", carSchema);
