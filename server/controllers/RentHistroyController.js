import { Rent } from "../models/RentModel";

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
      await Rent.deleteOne({ _id: req.body.id });
      res.status(200).send("Histroy deleted");
    } catch (error) {
      res.status(500).json({ error: "Failed to delete histroy, please try again"});
    }
  }
}