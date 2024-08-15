import { validationResult } from "express-validator";
import { Signup } from "../models/SignupModel.js";
import { tokRes } from "../utils/tokenGenerator.js";


export default class UsersController {
  static async postNewUser (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, address, phone, password } = req.body;

    try {
      await Signup.create({
        firstName,
        lastName,
        email,
        address,
        phone,
        profilePic: req.files.profilePic ? req.files.profilePic[0].path : undefined,
        password,
      });

      return res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error, please try again later." });
    }
  }

  static async getUser(req, res) {
    
    const {email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ msg: "Please provide email and password" });
    }
  
  
    try {
      const user = await Signup.findOne({ email, status: "active" }).select("+password");
      if (!user || !(await user.checkPasswordMatch(password, user.password))) {
        return res.status(404).json({ msg: "Invalid email or password" });
      }
  
      tokRes({ user, res, sc: 200, done: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error, please try again later." });
    }
  }

  static async getAllUser(req, res) {
    try {
      const users = await Signup.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users, please try again later." });
    }
  }
}

