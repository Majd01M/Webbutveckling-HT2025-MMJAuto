import { Router } from "express";
import { listParts, getPart, createPart, updatePart, deletePart } from "../controllers/partController.js";
import { protect, adminOnly } from "../middleware/auth.js";
const router = Router();

router.get("/", listParts);
router.get("/:id", getPart);
router.post("/", protect, adminOnly, createPart);
router.put("/:id", protect, adminOnly, updatePart);
router.delete("/:id", protect, adminOnly, deletePart);

export default router;

