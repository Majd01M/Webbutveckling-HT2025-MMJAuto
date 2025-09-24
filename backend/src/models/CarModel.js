import mongoose from "mongoose";

const carModelSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    yearFrom: { type: Number, required: true },
    yearTo: { type: Number, required: true }
  },
  { timestamps: true }
);

carModelSchema.index({ brand: 1, name: 1, yearFrom: 1, yearTo: 1 }, { unique: true });

export default mongoose.model("CarModel", carModelSchema);

