import CarPart from "../models/CarPart.js";

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
    const part = await CarPart.findById(req.params.id);

    if (part) {
      part.name = req.body.name || part.name;
      part.description = req.body.description || part.description;
      part.price = req.body.price || part.price;
      part.stock = req.body.stock ?? part.stock;
      part.carModel = req.body.carModel || part.carModel;
      part.category = req.body.category || part.category;
      part.image = req.body.image || part.image;

      const updatedPart = await part.save();
      res.json(updatedPart);
    } else {
      res.status(404).json({ message: "Car part not found" });
    }
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
    if (part) {
      await part.remove();
      res.json({ message: "Car part removed" });
    } else {
      res.status(404).json({ message: "Car part not found" });
    }
  } catch (error) {
    console.error("Error deleting car part:", error);
    res.status(500).json({ message: "Server error" });
  }
};
