import { Router } from "express";
import { login, register, me, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.put("/me", protect, updateProfile);

export default router;

