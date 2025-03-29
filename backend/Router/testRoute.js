import express from "express";
const TestRoute = express.Router();

import {
  getAllTest,
  deleteTest,
  createTest,
} from "../controller/testController.js";
import { ensureAuthenticated } from "../MiddleWare/Auth.js";

TestRoute.get("/allTest", ensureAuthenticated, getAllTest);
TestRoute.delete("/delete/:id", ensureAuthenticated, deleteTest);
TestRoute.post("/create", ensureAuthenticated, createTest);

export default TestRoute;
