import express from "express";
import {
  getCarModels,
  getCarModelById,
  createCarModel,
  updateCarModel,
  deleteCarModel
} from "../controllers/carModelController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCarModels).post(protect, admin, createCarModel);
router.route("/:id")
  .get(getCarModelById)
  .put(protect, admin, updateCarModel)
  .delete(protect, admin, deleteCarModel);

export default router;
