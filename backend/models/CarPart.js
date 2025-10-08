import mongoose from "mongoose";

const carPartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // ✅ make sure this exists
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String },
  carModel: { type: mongoose.Schema.Types.ObjectId, ref: "CarModel" },
}, { timestamps: true });

const CarPart = mongoose.model("CarPart", carPartSchema);
export default CarPart;
