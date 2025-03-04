import express from "express";
const userRoute = express.Router();
import {
  userList,
  singleUser,
  removeUSer,
  signUp,
  login
} from "../controller/userController.js";
import { signupValidation,loginValidation } from "../MiddleWare/AuthValidation.js";

userRoute.get("/userList", userList);
userRoute.get("/singleuser/:id", singleUser);
userRoute.delete("/deleteuser/:id", removeUSer);
userRoute.post("/register", signupValidation,signUp);
userRoute.post("/login", loginValidation,login);
export default userRoute;
