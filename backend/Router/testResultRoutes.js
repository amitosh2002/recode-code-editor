import express from "express";
import {
  getALlResult,
  getSingleResult,
  submitExam,
} from "../controller/testResultController.js";
const TestResultRoute = express.Router();
import { ensureAuthenticated } from "../MiddleWare/Auth.js";

TestResultRoute.get("/result/all", ensureAuthenticated, getALlResult);
TestResultRoute.get("/result/:id", ensureAuthenticated, getSingleResult);
TestResultRoute.post("/result/submit", ensureAuthenticated, submitExam);
export default TestResultRoute;
