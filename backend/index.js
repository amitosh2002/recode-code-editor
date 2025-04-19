import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import route from "./Router/questionRoutes.js";
import userRoute from "./Router/userRoutes.js";
import TestResultRoute from "./Router/testResultRoutes.js";
import TestRoute from "./Router/testRoute.js";
import dbRouter from "./Router/dataBaseRoute.js";


dotenv.config();

const app = express();
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:5173",                  
  "https://recode-code-editor.onrender.com"
];

app.use(
  cors({
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
app.use("/api/db/", dbRouter);

app.use("/api", route);
app.use("/api/auth", userRoute);
app.use("/api/test", TestRoute);
app.use("/api/result", TestResultRoute);