import { Car } from "../models/CarModel.js";

export default class CarsController {
  static async postNewCar(req, res, next) {
    const { model, mark, price, ac, door, transmission, fuel, year } = req.body;

    if (!model || !mark || !price || !ac || !door || !transmission || !fuel || !req.files.carPhoto) {
      return res.status(400).send("Please fill out the form correctly.");
    }

    try {
      await Car.create({
        carPhoto: req.files.carPhoto[0].path.split("/").pop(),
        model,
        mark,
        price,
        ac,
        door,
        transmission,
        fuel,
        year,
      });
  
      return res.status(200).json({ message: "Car added successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to add car, please try again later." });
    }
  }

  static async postRentCar(req, res) {
    const {
      firstName,
      lastName,
      email,
      address,
      phone,
      profilePic,
      carPhoto,
      model,
      mark,
      price,
      pickDate,
      dropDate,
      pickTime,
      dropTime,
      id,
    } = req.body;
  
    try {
      const car = await Car.findOne(id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      car.status = "Taken";
      await car.save();
  
      // Create a new rental record
      await Rent.create({
        firstName,
        lastName,
        email,
        address,
        phone,
        profilePic,
        carPhoto,
        model,
        mark,
        price,
        pickDate,
        dropDate,
        pickTime,
        dropTime,
        carId: new ObjectId(id),
      });
  
      res.status(200).json({ message: "Car booked successfully" });
    } catch (error) {
      console.error("Error booking car:", error);
      res.status(500).json({ message: "Server error, please try again later." });
    }
  }
}
