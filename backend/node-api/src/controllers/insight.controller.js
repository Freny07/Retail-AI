import { getInsight } from "../services/pythonAI.service.js";

export const generateInsight = async (req, res) => {
  try {
    const insight = await getInsight(req.body);
    res.status(200).json(insight);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Insight generation failed"
    });
  }
};
