import mongoose from "mongoose";

const carPartSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    imageUrl: { type: String },
    specs: { type: String },
    compatibleModels: [{ type: mongoose.Schema.Types.ObjectId, ref: "CarModel" }]
  },
  { timestamps: true }
);

carPartSchema.index({ name: "text", category: "text", specs: "text" });

export default mongoose.model("CarPart", carPartSchema);

