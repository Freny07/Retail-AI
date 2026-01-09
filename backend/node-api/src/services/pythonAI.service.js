import axios from "axios";

const PYTHON_AI_URL = process.env.PYTHON_AI_URL || "http://127.0.0.1:8000";

export const getInsight = async (insightRequest) => {
  try {
    console.log("📤 Sending request to Python AI:", insightRequest);

    const response = await axios.post(
      `${PYTHON_AI_URL}/ai/insight`,
      insightRequest,
      {
        timeout: 8000,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("📥 Python AI response:", response.data);

    const data = response.data?.insight;

    if (!data) {
      throw new Error("Invalid AI response format");
    }

    return {
      message: data.message ?? "No message",
      confidence: data.confidence ?? 0,
      explanation: data.explanation ?? ""
    };

  } catch (error) {
    console.error("❌ Python AI service error:");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }

    throw new Error("Failed to get insight from AI service");
  }
};
