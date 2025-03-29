import express from "express";
const userRoute = express.Router();
import {
  userList,
  singleUser,
  removeUSer,
  signUp,
  login,
  saveUserData,
} from "../controller/userController.js";
import {
  signupValidation,
  loginValidation,
} from "../MiddleWare/AuthValidation.js";
import { ensureAuthenticated } from "../MiddleWare/Auth.js";

// userRoute.get("/userList",ensureAuthenticated, userList); // aded a middleware ensureAuthenticated
userRoute.get("/userList", userList); // aded a middleware ensureAuthenticated
userRoute.get("/singleuser/:id", singleUser);
userRoute.delete("/deleteuser/:id", removeUSer);
userRoute.post("/register", signupValidation, signUp);
userRoute.post("/login", loginValidation, login);
userRoute.put("/saveRecords", saveUserData);
export default userRoute;
