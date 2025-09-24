import { Router } from "express";
import {
  getMyWishlist,
  addToWishlist,
  updateWishlistItem,
  removeWishlistItem,
  clearWishlist
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, getMyWishlist);
router.post("/", protect, addToWishlist);
router.put("/item/:itemId", protect, updateWishlistItem);
router.delete("/item/:itemId", protect, removeWishlistItem);
router.delete("/", protect, clearWishlist);

export default router;

