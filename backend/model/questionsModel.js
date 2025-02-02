// const mongoose = require("mongoose");
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    tittle: { type: String, required: true },
    description: { type: String, required: true },
    questionText: { type: String, required: true },
    testCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
      },
    ],
    difficulty: { type: String, required: true },
  },
  { collection: "question" }
);

export default mongoose.model("question", questionSchema);
