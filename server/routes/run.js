import express from "express";
import { runCode } from "../controllers/runcontroller.js";

const router = express.Router();

// POST /run
router.post("/", runCode);

export default router;
