import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    password: { type: String, required: true },
    userData: [
      { testResult: { type: String } },
      { questionSolved: { type: Number } },
    ],
  },
  { collection: "User" }
);

export default mongoose.model("User", userSchema);
