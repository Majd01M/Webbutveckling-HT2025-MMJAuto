import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mem;

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    let connStr = uri;

    if (!uri || uri === "MEMORY") {
      mem = await MongoMemoryServer.create();
      connStr = mem.getUri("mmjauto");
      console.log("Using in-memory MongoDB for development.");
    }

    const conn = await mongoose.connect(connStr);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;

