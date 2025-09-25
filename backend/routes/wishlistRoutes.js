import express from "express";
import {
  getWishlist,
  addToWishlist,
  updateWishlistItem,
  removeFromWishlist
} from "../controllers/wishlistController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getWishlist).post(protect, addToWishlist);
router.route("/:partId").put(protect, updateWishlistItem).delete(protect, removeFromWishlist);

export default router;
