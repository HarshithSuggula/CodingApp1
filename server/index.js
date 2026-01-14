import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { signup, login } from "./routes/auth.js";
import { problemsTable, createProblem } from "./routes/problemsTable.js";
import { problemDetails, createProblemDetails } from "./routes/problemDetails.js";
import runRoute from "./routes/run.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    // origin: ["https://sheetcoder.vercel.app"],
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// DATABASE MONGODB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(process.env.MONGO_URL);

    console.error("Error connecting to MongoDB:", error.message);
  });

// AUTH 
app.use("/auth/signup", signup);
app.use("/auth/login", login);

// PROBLEMS TABLE
app.get("/problemsTable", problemsTable);
app.post("/problemsTable", createProblem);

// PROBLEM DETAILS
app.get("/problem/:id", problemDetails);
app.post("/problem", createProblemDetails);
app.use("/run", runRoute);