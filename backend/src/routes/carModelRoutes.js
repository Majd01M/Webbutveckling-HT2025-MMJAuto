import { Router } from "express";
import { listModels, createModel, updateModel, deleteModel } from "../controllers/carModelController.js";
import { protect, adminOnly } from "../middleware/auth.js";
const router = Router();

router.get("/", listModels);
router.post("/", protect, adminOnly, createModel);
router.put("/:id", protect, adminOnly, updateModel);
router.delete("/:id", protect, adminOnly, deleteModel);

export default router;

