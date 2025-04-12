import bodyParser from "body-parser";
const app = express();
import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./Router/questionRoutes.js";
import userRoute from "./Router/userRoutes.js";
import dotenv from "dotenv";
import TestResultRoute from "./Router/testResultRoutes.js";

import TestRoute from "./Router/testRoute.js";
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:5173",                  // Local dev
  "https://recode-code-editor.onrender.com" // Production
];
app.use(
  cors(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
  })
);
dotenv.config();
const PORT = process.env.PORT || 6001;
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

app.use("/api", route);
app.use("/api/auth", userRoute);
app.use("/api/test", TestRoute);
app.use("/api/result", TestResultRoute);
