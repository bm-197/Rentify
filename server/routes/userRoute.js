import express from "express";
import UsersControllers from "../controllers/UsersController.js";
import CarsController from "../controllers/CarsController.js";
import { userValidator } from "../utils/validator.js";
import { upload } from "../utils/upload.js";


const userRouter = express.Router();
const files = upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "carPhoto", maxCount: 1 }
])

userRouter.post("/register", files, userValidator, UsersControllers.postNewUser);
userRouter.post("/login", UsersControllers.getUser);
userRouter.post("/add/car", files, CarsController.postNewCar);

export default userRouter;