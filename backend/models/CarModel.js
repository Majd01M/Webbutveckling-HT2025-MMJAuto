import mongoose from "mongoose";

const carModelSchema = mongoose.Schema(
  {
    brand: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("CarModel", carModelSchema);
