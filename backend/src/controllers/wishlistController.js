import Wishlist from "../models/Wishlist.js";
import CarPart from "../models/CarPart.js";

const ensureWishlist = async (userId) => {
  let wl = await Wishlist.findOne({ user: userId });
  if (!wl) wl = await Wishlist.create({ user: userId, items: [] });
  return wl;
};

export const getMyWishlist = async (req, res) => {
  const wl = await ensureWishlist(req.user._id);
  await wl.populate("items.part");
  res.json(wl);
};

export const addToWishlist = async (req, res) => {
  const { partId, quantity = 1 } = req.body;
  const part = await CarPart.findById(partId);
  if (!part) return res.status(404).json({ message: "Part not found" });

  const wl = await ensureWishlist(req.user._id);
  const idx = wl.items.findIndex((i) => i.part.toString() === partId);
  if (idx >= 0) wl.items[idx].quantity += Number(quantity);
  else wl.items.push({ part: partId, quantity: Number(quantity) });

  await wl.save();
  await wl.populate("items.part");
  res.status(201).json(wl);
};

export const updateWishlistItem = async (req, res) => {
  const { quantity } = req.body;
  const wl = await ensureWishlist(req.user._id);
  const item = wl.items.id(req.params.itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });
  item.quantity = Math.max(1, Number(quantity));
  await wl.save();
  await wl.populate("items.part");
  res.json(wl);
};

export const removeWishlistItem = async (req, res) => {
  const wl = await ensureWishlist(req.user._id);
  const item = wl.items.id(req.params.itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });
  item.deleteOne();
  await wl.save();
  await wl.populate("items.part");
  res.json(wl);
};

export const clearWishlist = async (req, res) => {
  const wl = await ensureWishlist(req.user._id);
  wl.items = [];
  await wl.save();
  res.json(wl);
};

