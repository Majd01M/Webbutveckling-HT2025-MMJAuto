import mongoose from "mongoose";

const carPartSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    compatibility: [{ type: mongoose.Schema.Types.ObjectId, ref: "CarModel" }],
    image: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("CarPart", carPartSchema);
