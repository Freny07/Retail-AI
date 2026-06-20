import express from "express";
import axios from "axios";
import { generateInsight } from "../controllers/ai.controller.js";

const router = express.Router();

// GET /api/ai/insights → called by frontend
router.get("/insights", async (req, res) => {
  try {
    // Here you can optionally send some payload to your FastAPI service
    const payload = { /* optional: send summary of uploaded CSV */ };

    const aiResponse = await axios.post(
      "http://localhost:8000/ai/insight", // your FastAPI AI service
      payload,
      { timeout: 60000 }
    );

    res.json({
      expiryRisk: aiResponse.data.expiryRisk || "No data",
      demandSurge: aiResponse.data.demandSurge || "No data",
      layoutOpportunity: aiResponse.data.layoutOpportunity || "No data"
    });
  } catch (err) {
    console.error("AI SERVICE ERROR:", err.message);
    res.status(500).json({
      expiryRisk: "Error",
      demandSurge: "Error",
      layoutOpportunity: "Error"
    });
  }
});

// POST /ai/insight → called by frontend
router.post("/insight", generateInsight);

export default router;
