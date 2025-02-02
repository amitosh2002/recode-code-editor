// const express = require("express");
import express from "express";
const route = express.Router();
import {
  getAll,
  newQuestion,
  getOne,
  updateQuestion,
  deleteQuestion,
} from "../controller/questionController.js";

route.post("/addQuestion", newQuestion);
route.get("/allQuestion", getAll);
route.get("/singleQuestion/:id", getOne);
route.put("/update/:id", updateQuestion);
route.delete("/deleteId/:id", deleteQuestion);
export default route;
