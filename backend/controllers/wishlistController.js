import Wishlist from "../models/Wishlist.js";

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("carParts");
    // return array of carParts
    res.json(wishlist?.carParts || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { partId } = req.body; // <-- must match frontend
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) wishlist = new Wishlist({ user: req.user._id, carParts: [] });

    if (!wishlist.carParts.includes(partId)) wishlist.carParts.push(partId);

    await wishlist.save();
    await wishlist.populate("carParts");

    // return array of carParts
    res.json(wishlist.carParts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const removeFromWishlist = async (req, res) => {
  try {
    const { carPartId } = req.body;

    if (!carPartId) return res.status(400).json({ message: "carPartId is required" });

    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    // Remove the part safely, skipping nulls
    wishlist.carParts = wishlist.carParts.filter(
      (id) => id && id.toString() !== carPartId.toString()
    );

    await wishlist.save();
    await wishlist.populate("carParts");

    res.json(wishlist.carParts);
  } catch (err) {
    console.error("Wishlist removal error:", err);
    res.status(500).json({ message: err.message });
  }
};