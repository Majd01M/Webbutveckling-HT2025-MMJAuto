import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "CarPart" },
        quantity: { type: Number, default: 1 }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
