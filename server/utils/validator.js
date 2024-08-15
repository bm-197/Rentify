import { body } from "express-validator";
import { Signup } from "../models/SignupModel.js";

export const userValidator = [
  body("firstName")
    .isLength({ min: 4 })
    .withMessage("First name must be greater than 3 characters")
    .isLength({ max: 100 })
    .withMessage("First name must be less than 100 characters")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("First name must contain only characters"),

  body("lastName")
    .isLength({ min: 4 })
    .withMessage("Last name must be greater than 3 characters")
    .isLength({ max: 100 })
    .withMessage("Last name must be less than 100 characters")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Last name must contain only characters"),

  body("address")
    .isLength({ min: 4 })
    .withMessage("Address must be greater than 3 characters")
    .isLength({ max: 100 })
    .withMessage("Address must be less than 100 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (val, { req }) => {
      const data = await Signup.find({ email: req.body.email });
      if (data.length !== 0) {
        throw new Error("This email is already registered, try with a different email");
      }
      return true;
    }),

  body("phone")
    .isNumeric()
    .withMessage("Phone must be a number")
    .isLength({ min: 9, max: 10 })
    .withMessage("Please insert a valid phone number"),

  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password length must be between 8 and 16 characters")
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character"),

  body("confirmPassword").custom((val, { req }) => {
    if (req.body.password !== val) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];
