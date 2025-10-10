import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  carParts: [{ type: mongoose.Schema.Types.ObjectId, ref: "CarPart" }],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;