import express from "express";
import {
  getCarParts,
  getCarPartById,
  createCarPart,
  updateCarPart,
  deleteCarPart
} from "../controllers/carPartController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCarParts).post(protect, admin, createCarPart);
router.route("/:id")
  .get(getCarPartById)
  .put(protect, admin, updateCarPart)
  .delete(protect, admin, deleteCarPart);

export default router;
