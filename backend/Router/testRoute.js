import express from "express";
const TestRoute = express.Router();

import {
  getAllTest,
  deleteTest,
  createTest,
  getTest,
} from "../controller/testController.js";
import { ensureAuthenticated } from "../MiddleWare/Auth.js";

TestRoute.get("/allTest", getAllTest);
TestRoute.delete("/delete/:id", deleteTest);
TestRoute.post("/create", createTest);
TestRoute.get("/singletest/:id", getTest);

export default TestRoute;
