import express from "express";
import UsersControllers from "../controllers/UsersController.js";
import CarsController from "../controllers/CarsController.js";
import RentHistoryController from "../controllers/RentHistroyController.js";
import { userValidator } from "../utils/validator.js";
import { upload } from "../utils/upload.js";
import { AuthMiddleware } from "../middleware/auth.js";
import ActionsController from "../controllers/ActionsController.js";

const userRouter = express.Router();
const files = upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "carPhoto", maxCount: 1 }
])

userRouter.post("/register", files, userValidator, UsersControllers.postNewUser);
userRouter.post("/login", UsersControllers.getUser);
userRouter.get("/get/all/users", UsersControllers.getAllUser);
userRouter.post("/add/car", files, AuthMiddleware, CarsController.postNewCar);
userRouter.post("/rent/car", AuthMiddleware, files, CarsController.postRentCar);
userRouter.get("/get/all/cars", CarsController.getAllcars);
userRouter.get("/get/history", RentHistoryController.getHistory);
userRouter.delete("/delete/History", files, AuthMiddleware, RentHistoryController.deleteHistory);
userRouter.patch("/freeze/active/user", AuthMiddleware, ActionsController.freeze);

export default userRouter;