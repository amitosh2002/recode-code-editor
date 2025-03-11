import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    userData: [
    {
      date: { type: String },
      passed: { type: String },
      failed: { type: String },
      questionId: { type: String },
      questionDetails: { type: String },
      questionAnswer: [
        {
          input: { type: String },
          output: { type: String }
        }
      ], // ✅ Define questionAnswer as an array of objects
      answerStatus: { type: String },
      feedback: { type: String },
      report: { type: Array }
    },
  ],
  },
  { collection: "User" }
);

export default mongoose.model("User", userSchema);
