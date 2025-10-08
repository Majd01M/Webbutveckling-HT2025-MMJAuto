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

    // Create users
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
    const bmw = await CarModel.create({ name: "X5", brand: "BMW", year: 2022 , image: "https://cdn.bmwblog.com/wp-content/uploads/2021/08/2022-bmw-x5m-facelift-lci.jpg" });
    const audi = await CarModel.create({ name: "A4", brand: "Audi", year: 2021 , image: "https://hips.hearstapps.com/hmg-prod/images/2021-audi-a4-45-tfsi-quattro-106-1607927016.jpg?crop=0.678xw:0.572xh;0.138xw,0.334xh&resize=2048:*"});
    const mercedes = await CarModel.create({ name: "S500", brand: "Mercedes", year: 2025 , image:"https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_1600.jpg"});
    console.log("✅ Car models seeded successfully");

    // Create car parts linked to models
    await CarPart.create([
      { name: "Air Filter", category: "Engine", price: 50, stock: 10, carModel: bmw._id ,  image: "https://burgertuning.com/cdn/shop/products/F10-BMW_535-N55-BMS-Intake-blue-filter_1080x.jpg?v=1628899466"},
      { name: "Brake Pads", category: "Brakes", price: 70, stock: 15, carModel: audi._id, image: "https://cdn11.bigcommerce.com/s-pn4c35ct31/images/stencil/1280x1280/products/325/1169/7L0698151R__04693.1568381497.JPG?c=2" },
      { name: "Oil Filter", category: "Engine", price: 40, stock: 20, carModel: bmw._id, image: "https://m.media-amazon.com/images/I/31s+3+AX50L._UF894,1000_QL80_.jpg" },
      { name: "Spark Plug", category: "Engine", price: 30, stock: 25, carModel: audi._id, image: "https://m.media-amazon.com/images/I/71oY4LSoO5L.jpg" },
    ]);

    console.log("✅ Car parts seeded successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

importData();
