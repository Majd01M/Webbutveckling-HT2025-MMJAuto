import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/error.js";

import authRoutes from "./src/routes/authRoutes.js";
import carModelRoutes from "./src/routes/carModelRoutes.js";
import partRoutes from "./src/routes/partRoutes.js";
import wishlistRoutes from "./src/routes/wishlistRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";

dotenv.config();
const app = express();
await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/", (req, res) => res.json({ ok: true, name: "MMJAuto API" }));

app.use("/api/auth", authRoutes);
app.use("/api/models", carModelRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

