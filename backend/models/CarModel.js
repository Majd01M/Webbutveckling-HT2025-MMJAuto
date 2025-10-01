import mongoose from "mongoose";

const carModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  year: { type: Number, required: true },
  image: { type: String }, // ✅ add this
});

const CarModel = mongoose.model("CarModel", carModelSchema);
export default CarModel;
