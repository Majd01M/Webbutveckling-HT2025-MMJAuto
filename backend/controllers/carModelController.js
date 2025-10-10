import CarModel from "../models/CarModel.js";

export const getCarModels = async (req, res) => {
  const models = await CarModel.find({});
  res.json(models);
};

export const getCarModelById = async (req, res) => {
  const model = await CarModel.findById(req.params.id);
  if (model) res.json(model);
  else res.status(404).json({ message: "Car model not found" });
};

// Create a new car model
export const createCarModel = async (req, res) => {
  try {
    const { name, brand, year, image } = req.body; // include image
    const carModel = await CarModel.create({ name, brand, year, image });
    res.status(201).json(carModel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update an existing car model
export const updateCarModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, year, image } = req.body; // include image
    const carModel = await CarModel.findByIdAndUpdate(
      id,
      { name, brand, year, image },
      { new: true }
    );
    if (!carModel) return res.status(404).json({ message: "Car model not found" });
    res.json(carModel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCarModel = async (req, res) => {
  try {
    const model = await CarModel.findById(req.params.id);

    if (!model) {
      return res.status(404).json({ message: "Car model not found" });
    }

    await model.deleteOne(); // <-- use deleteOne instead of remove
    res.json({ message: "Car model deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
