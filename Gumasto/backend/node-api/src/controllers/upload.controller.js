import fs from "fs";
import csv from "csv-parser";
import StoreData from "../models/StoreData.model.js";
import Product from "../models/Product.model.js";
import Store from "../models/Store.model.js";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const handleCSVUpload = async (req, res) => {
  console.log("REQ FILE:", req.file);
  console.log("REQ BODY:", req.body);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const results = [];
  const normalizeKey = (key) => key.toLowerCase().replace(/[\s-_]/g, "");

  try {
    // 1. Get authenticated user (optional auth fallback)
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        console.error("JWT verification failed during upload:", err.message);
      }
    }

    // 2. Resolve or create Store
    let store = null;
    if (userId) {
      store = await Store.findOne({ owner: userId });
    }
    if (!store) {
      store = await Store.findOne({ name: "Guest Store" });
    }
    if (!store) {
      let user = await User.findOne();
      if (!user) {
        user = await User.create({
          name: "Guest User",
          email: "guest@gumasto.com",
          password: "guestpassword123"
        });
      }
      store = await Store.create({
        name: "Guest Store",
        owner: user._id,
        address: "Guest Address"
      });
    }
    const storeId = store._id;

    // 3. Parse CSV
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          let rowsProcessed = 0;
          for (const row of results) {
            const normalizedRow = {};
            for (const key of Object.keys(row)) {
              normalizedRow[normalizeKey(key)] = row[key];
            }

            const productName = normalizedRow["productname"];
            const brand = normalizedRow["brand"] || "Generic";
            const category = normalizedRow["category"] || "Uncategorized";
            const price = parseFloat(normalizedRow["price"]) || 0;
            const stock = parseInt(normalizedRow["stock"]) || 0;
            const unitsSold = parseInt(normalizedRow["unitssold"]) || 0;
            const expiryDateStr = normalizedRow["expirydate"];

            if (!productName) continue;

            // Find or create product
            let product = await Product.findOne({ name: productName, store: storeId });
            const expiryDate = expiryDateStr ? new Date(expiryDateStr) : new Date(Date.now() + 10 * 24 * 3600 * 1000);
            const cost = price * 0.8; // default cost to 80% of price

            if (product) {
              product.price = price;
              product.stock = stock;
              product.sales = unitsSold;
              product.category = category;
              product.brand = brand;
              product.cost = cost;
              product.expiryDate = expiryDate;
              await product.save();
            } else {
              product = await Product.create({
                name: productName,
                store: storeId,
                price,
                stock,
                sales: unitsSold,
                category,
                brand,
                cost,
                expiryDate
              });
            }

            // Create StoreData entry
            await StoreData.create({
              store_id: storeId.toString(),
              product_id: product._id.toString(),
              date: new Date(),
              sales: unitsSold,
              inventory: stock,
              waste: Math.max(0, stock - unitsSold)
            });

            rowsProcessed++;
          }

          // Clean up the temp file
          fs.unlinkSync(req.file.path);

          res.json({
            message: `CSV uploaded & processed successfully! Parsed ${rowsProcessed} rows.`,
            filename: req.file.filename,
            rowsProcessed
          });
        } catch (parseErr) {
          console.error("CSV process error:", parseErr);
          if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
          res.status(500).json({ message: "Failed to process CSV rows", error: parseErr.message });
        }
      })
      .on("error", (streamErr) => {
        console.error("CSV stream error:", streamErr);
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ message: "Error reading CSV file", error: streamErr.message });
      });

  } catch (error) {
    console.error("CSV Controller outer error:", error);
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: error.message });
  }
};
