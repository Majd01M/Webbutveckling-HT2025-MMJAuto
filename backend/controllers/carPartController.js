import CarPart from "../models/CarPart.js";
import { sendEmail } from "../utils/emailService.js";
import User from "../models/User.js"; // to get all customers
import Wishlist from "../models/Wishlist.js";

// @desc    Get all car parts (with optional filters + search)
// @route   GET /api/carparts
// @access  Public
export const getCarParts = async (req, res) => {
  try {
    const filters = {};

    // Filter by model ID
    if (req.query.modelId) filters.carModel = req.query.modelId;

    // Filter by stock availability
    if (req.query.inStock) filters.stock = { $gt: 0 };

    // 🔍 Search by name, category, or description
    if (req.query.search) {
      filters.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { category: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const parts = await CarPart.find(filters).populate("carModel");
    res.json(parts);
  } catch (error) {
    console.error("Error fetching car parts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get car part by ID
// @route   GET /api/carparts/:id
// @access  Public
export const getCarPartById = async (req, res) => {
  try {
    const part = await CarPart.findById(req.params.id).populate("carModel");
    if (part) {
      res.json(part);
    } else {
      res.status(404).json({ message: "Car part not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new car part
// @route   POST /api/carparts
// @access  Public (or Admin if you add auth)
export const createCarPart = async (req, res) => {
  try {
    const { name, description, price, stock, carModel, category, image } = req.body;

    // Create new part first
    const part = new CarPart({
      name,
      description,
      price,
      stock,
      carModel,
      category,
      image,
    });

    const createdPart = await part.save();

    // Notify all customers via email
    const customers = await User.find({ role: "customer" });
    const emails = customers.map((u) => u.email);

    await sendEmail(
      emails,
      "🆕 New Car Part Added!",
      `A new car part "${createdPart.name}" has just been added to MMJAuto. Check it out!`
    );

    res.status(201).json(createdPart);
  } catch (error) {
    console.error("Error creating car part:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update an existing car part
// @route   PUT /api/carparts/:id
// @access  Public (or Admin if you add auth)
export const updateCarPart = async (req, res) => {
  try {
    const oldPart = await CarPart.findById(req.params.id);
    if (!oldPart) return res.status(404).json({ message: "Car part not found" });

    const updatedPart = await CarPart.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // If restocked (was 0 or less, now > 0), notify only users with this part in their wishlist
if (oldPart.stock <= 0 && updatedPart.stock > 0) {
  // Find wishlists containing this part
  const wishlists = await Wishlist.find({ carParts: updatedPart._id }).populate("user");

  // Extract emails
  const emails = wishlists.map(w => w.user.email);

  if (emails.length > 0) {
    await sendEmail(
      emails,
      "✅ Car Part Back in Stock!",
      `Good news! "${updatedPart.name}" is now back in stock at MMJAuto. Check your wishlist!`
    );
  }
}



    res.json(updatedPart);
  } catch (error) {
    console.error("Error updating car part:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a car part
// @route   DELETE /api/carparts/:id
// @access  Public (or Admin if you add auth)
export const deleteCarPart = async (req, res) => {
  try {
    const part = await CarPart.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ message: "Car part not found" });
    }

    await part.deleteOne(); 
    res.json({ message: "Car part removed" });
  } catch (error) {
    console.error("Error deleting car part:", error);
    res.status(500).json({ message: "Server error" });
  }
};
