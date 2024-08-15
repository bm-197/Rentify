import { Rent } from "../models/RentModel.js";
import mongoose from "../utils/db.js";
import { ObjectId } from "mongodb";


export default class RentHistoryController {
  static async getHistory(req, res) {
    try {
      const historyRecords = await Rent.find();
      res.status(200).send(historyRecords);
    } catch (error) {
      res.status(200).json({ error: "Failed to retrive history, please try again."});
    }
  }

  static async deleteHistory(req, res) {
    try {
      const { id } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      // Attempt to delete the document
      const result = await Rent.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({ error: "History not found" });
      }

      res.status(200).send("History deleted");
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Failed to delete histroy, please try again"});
    }
  }
}