import { Car } from "../models/CarModel.js";

export default class ActionsController {
  static async freeze(req, res) {
    const { type, id, action } = req.body;

    try {
      if (type === "RELEASE_CAR") {
        await Car.updateOne({ _id: id }, { status: "available" });
        return res.status(200).send("Car released.");
      } else if (type === "HIDE_CAR") {
        await Car.updateOne({ _id: id }, { active: false });
        return res.status(200).send("Car hidden.");
      } else if (type === "SHOW_CAR") {
        await Car.updateOne({ _id: id }, { active: true });
        return res.status(200).send("Car shown.");
      } else {
        return res.status(400).json({ error: "Invalid action type provided." });
      }
    } catch (error) {
      console.error("Error performing action:", error);
      return res
        .status(500)
        .json({ error: "Server error, please try again later." });
    }
  }
}
