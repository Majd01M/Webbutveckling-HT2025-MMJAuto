import { Router } from "express";
import { listMyNotifications, markRead, createNotification } from "../controllers/notificationController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, listMyNotifications);
router.put("/:id/read", protect, markRead);
router.post("/", protect, adminOnly, createNotification);

export default router;

