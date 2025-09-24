import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import User from "../models/User.js";
import CarModel from "../models/CarModel.js";
import CarPart from "../models/CarPart.js";

await connectDB();

console.log("Seeding database...");

await User.deleteMany({});
await CarModel.deleteMany({});
await CarPart.deleteMany({});

const admin = await User.create({
  name: "Admin",
  email: "admin@mmjauto.local",
  password: "Admin123!",
  role: "admin"
});

const models = await CarModel.insertMany([
  { brand: "Toyota", name: "Corolla", yearFrom: 2014, yearTo: 2021 },
  { brand: "Honda", name: "Civic", yearFrom: 2016, yearTo: 2022 },
  { brand: "Ford", name: "Focus", yearFrom: 2012, yearTo: 2018 }
]);

const parts = await CarPart.insertMany([
  {
    name: "Air Filter",
    category: "Engine",
    price: 19.99,
    stock: 50,
    imageUrl: "",
    specs: "High flow paper element",
    compatibleModels: [models[0]._id, models[1]._id]
  },
  {
    name: "Brake Pads Front",
    category: "Brakes",
    price: 49.9,
    stock: 40,
    imageUrl: "",
    specs: "Ceramic set",
    compatibleModels: [models[0]._id]
  },
  {
    name: "Oil Filter",
    category: "Engine",
    price: 9.5,
    stock: 100,
    imageUrl: "",
    specs: "Spin-on",
    compatibleModels: [models[1]._id, models[2]._id]
  }
]);

console.log("Seeded:");
console.log({ admin: admin.email, models: models.length, parts: parts.length });
process.exit(0);

