// src/routes/insight.routes.js
import express from "express";
import { generateInsight } from "../controllers/insight.controller.js";

const router = express.Router();

router.post("/generate", generateInsight);

export default router;
