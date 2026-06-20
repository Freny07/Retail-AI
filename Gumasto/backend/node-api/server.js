import { env } from "./src/config/env.js";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import uploadRoutes from "./src/routes/upload.routes.js";
import cors from "cors";
import fs from "fs";

console.log("🚀 server.js loaded");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use(cors());
app.use("/uploads", uploadRoutes); // Note: frontend might call /api/upload/csv but let's expose uploads folder or route if needed. Wait, server.js had app.use("backend/uploads", uploadRoutes). In app.js we have app.use("/api/upload", uploadRoutes). We can keep both or keep original route. Let's make sure backend/uploads is accessible if they fetch static assets. Let's keep it.
const startServer = async () => {
  console.log("🔌 Connecting to DB...");
  await connectDB();

  console.log("🌐 Starting server...");
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
  });
};

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
}); 

startServer();
