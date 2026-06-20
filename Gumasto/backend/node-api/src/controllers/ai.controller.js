import Insight from "../models/Insight.model.js";
import Store from "../models/Store.model.js";
import { getInsight } from "../services/pythonAI.service.js";
import mongoose from "mongoose";

export const generateInsight = async (req, res) => {
  try {
    const { store_id, product_ids, start_date, end_date, metrics } = req.body;
    const isDbConnected = mongoose.connection.readyState === 1;

    // 1. Resolve store to a valid ObjectId
    let storeId = store_id;
    if (isDbConnected) {
      if (!storeId || !mongoose.Types.ObjectId.isValid(storeId)) {
        try {
          const store = await Store.findOne();
          if (store) {
            storeId = store._id;
          } else {
            storeId = new mongoose.Types.ObjectId();
          }
        } catch (err) {
          console.warn("Error finding store in DB, using mock storeId:", err.message);
          storeId = new mongoose.Types.ObjectId();
        }
      }
    } else {
      // Offline fallback: Use a dummy ObjectId
      storeId = new mongoose.Types.ObjectId();
    }

    // 2. Set defaults for missing query parameters
    const finalProductIds = product_ids || [];
    const finalStartDate = start_date ? new Date(start_date) : new Date();
    const finalEndDate = end_date ? new Date(end_date) : new Date(Date.now() + 7 * 24 * 3600 * 1000);
    const finalMetrics = metrics || { totalRevenue: 0, totalTransactions: 0 };

    // 3. Check cache (only if DB is connected)
    let existing = null;
    if (isDbConnected) {
      try {
        existing = await Insight.findOne({
          store: storeId,
          product_ids: finalProductIds,
          start_date: finalStartDate,
          end_date: finalEndDate
        });
      } catch (dbErr) {
        console.warn("Failed to check cached insight in DB:", dbErr.message);
      }
    }

    if (existing) {
      return res.status(200).json({
        message: "Insight fetched from cache",
        insight: existing
      });
    }

    // 4. Construct payload for python-ai
    const payload = {
      store_id: storeId.toString(),
      product_ids: finalProductIds,
      start_date: finalStartDate.toISOString(),
      end_date: finalEndDate.toISOString(),
      metrics: finalMetrics
    };

    // 5. Call Python AI service
    const aiResponse = await getInsight(payload);

    // 6. Save new insight to MongoDB (only if DB is connected)
    let insight = null;
    if (isDbConnected) {
      try {
        insight = await Insight.create({
          store: storeId,
          product_ids: finalProductIds,
          start_date: finalStartDate,
          end_date: finalEndDate,
          metrics: finalMetrics,
          message: aiResponse.message,
          confidence: aiResponse.confidence,
          explanation: aiResponse.explanation || ""
        });
      } catch (dbErr) {
        console.warn("Failed to write insight cache to DB:", dbErr.message);
      }
    }

    if (!insight) {
      // Memory/offline fallback response object
      insight = {
        store: storeId,
        product_ids: finalProductIds,
        start_date: finalStartDate,
        end_date: finalEndDate,
        metrics: finalMetrics,
        message: aiResponse.message,
        confidence: aiResponse.confidence,
        explanation: aiResponse.explanation || ""
      };
    }

    // 7. Respond to frontend
    res.status(200).json({
      message: "Insight generated successfully",
      insight
    });

  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({ message: error.message });
  }
};
