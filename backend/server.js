import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import carModelRoutes from "./routes/carModelRoutes.js";
import carPartRoutes from "./routes/carPartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";




dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/carmodels", carModelRoutes);
app.use("/api/carparts", carPartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.get('/', (req, res) => {
    res.send('start page');
    
    
  });

app.get('/auth', (req, res) => {
    res.send('auth backend is running!');
  });
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
