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

export const createCarModel = async (req, res) => {
  const { brand, name, year,image } = req.body;
  const model = new CarModel({ brand, name, year , image });
  const createdModel = await model.save();
  res.status(201).json(createdModel);
};

export const updateCarModel = async (req, res) => {
  const model = await CarModel.findById(req.params.id);
  if (model) {
    model.brand = req.body.brand || model.brand;
    model.name = req.body.name || model.name;
    model.year = req.body.year || model.year;
    const updatedModel = await model.save();
    res.json(updatedModel);
  } else res.status(404).json({ message: "Car model not found" });
};

export const deleteCarModel = async (req, res) => {
  const model = await CarModel.findById(req.params.id);
  if (model) {
    await model.remove();
    res.json({ message: "Car model removed" });
  } else res.status(404).json({ message: "Car model not found" });
};
