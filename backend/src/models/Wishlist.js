import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    items: [
      {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "CarPart", required: true },
        quantity: { type: Number, default: 1, min: 1 }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);

