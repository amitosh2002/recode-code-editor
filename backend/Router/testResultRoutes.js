import express from "express";
import {
  getALlResult,
  getSingleResult,
  submitExam,
} from "../controller/testResultController.js";
const TestResultRoute = express.Router();
import { ensureAuthenticated } from "../MiddleWare/Auth.js";

TestResultRoute.get("/all",  getALlResult);
TestResultRoute.get("/:id", getSingleResult);
TestResultRoute.post("/submit", submitExam);
export default TestResultRoute;
