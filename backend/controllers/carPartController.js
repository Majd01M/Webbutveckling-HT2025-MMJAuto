import CarPart from "../models/CarPart.js";

export const getCarParts = async (req, res) => {
  const filters = {};
  if (req.query.modelId) filters.compatibility = req.query.modelId;
  if (req.query.inStock) filters.stock = { $gt: 0 };
  const parts = await CarPart.find(filters).populate("compatibility");
  res.json(parts);
};

export const getCarPartById = async (req, res) => {
  const part = await CarPart.findById(req.params.id).populate("compatibility");
  if (part) res.json(part);
  else res.status(404).json({ message: "Car part not found" });
};

export const createCarPart = async (req, res) => {
  const { name, description, price, stock, compatibility, image } = req.body;
  const part = new CarPart({ name, description, price, stock, compatibility, image });
  const createdPart = await part.save();
  res.status(201).json(createdPart);
};

export const updateCarPart = async (req, res) => {
  const part = await CarPart.findById(req.params.id);
  if (part) {
    part.name = req.body.name || part.name;
    part.description = req.body.description || part.description;
    part.price = req.body.price || part.price;
    part.stock = req.body.stock ?? part.stock;
    part.compatibility = req.body.compatibility || part.compatibility;
    part.image = req.body.image || part.image;
    const updatedPart = await part.save();
    res.json(updatedPart);
  } else res.status(404).json({ message: "Car part not found" });
};

export const deleteCarPart = async (req, res) => {
  const part = await CarPart.findById(req.params.id);
  if (part) {
    await part.remove();
    res.json({ message: "Car part removed" });
  } else res.status(404).json({ message: "Car part not found" });
};
