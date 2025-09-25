import Wishlist from "../models/Wishlist.js";
import CarPart from "../models/CarPart.js";

export const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("items.part");
  if (wishlist) res.json(wishlist);
  else res.json({ items: [] });
};

export const addToWishlist = async (req, res) => {
  const { partId, quantity } = req.body;
  const part = await CarPart.findById(partId);
  if (!part) return res.status(404).json({ message: "Car part not found" });

  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    wishlist = new Wishlist({ user: req.user._id, items: [] });
  }

  const existingItem = wishlist.items.find(i => i.part.toString() === partId);
  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    wishlist.items.push({ part: partId, quantity: quantity || 1 });
  }

  await wishlist.save();
  res.status(201).json(wishlist);
};

export const updateWishlistItem = async (req, res) => {
  const { quantity } = req.body;
  const wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

  const item = wishlist.items.find(i => i.part.toString() === req.params.partId);
  if (item) {
    item.quantity = quantity;
    await wishlist.save();
    res.json(wishlist);
  } else {
    res.status(404).json({ message: "Item not found in wishlist" });
  }
};

export const removeFromWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

  wishlist.items = wishlist.items.filter(i => i.part.toString() !== req.params.partId);
  await wishlist.save();
  res.json(wishlist);
};
