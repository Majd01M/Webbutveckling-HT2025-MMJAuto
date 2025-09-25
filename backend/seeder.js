// seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import CarModel from "./models/CarModel.js";
import CarPart from "./models/CarPart.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await CarModel.deleteMany({});
    await CarPart.deleteMany({});

    // Create users (plain passwords, pre-save hook will hash them)
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    const customer = await User.create({
      name: "Customer User",
      email: "customer@example.com",
      password: "customer123",
      role: "customer",
    });

    console.log("✅ Users seeded successfully");

    // Create car models
    const bmw = await CarModel.create({ name: "X5", brand: "BMW", year: 2022 });
    const audi = await CarModel.create({ name: "A4", brand: "Audi", year: 2021 });

    console.log("✅ Car models seeded successfully");

    // Create car parts
    await CarPart.create([
      { name: "Air Filter", category: "Engine", price: 50, carModel: bmw._id },
      { name: "Brake Pads", category: "Brakes", price: 70, carModel: audi._id },
    ]);

    console.log("✅ Car parts seeded successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

importData();
