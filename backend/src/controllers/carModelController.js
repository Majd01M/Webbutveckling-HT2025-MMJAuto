import CarModel from "../models/CarModel.js";

export const listModels = async (req, res) => {
  const q = req.query.q?.trim();
  const filter = q
    ? { $or: [{ brand: new RegExp(q, "i") }, { name: new RegExp(q, "i") }] }
    : {};
  const models = await CarModel.find(filter).sort({ brand: 1, name: 1 });
  res.json(models);
};

export const createModel = async (req, res) => {
  const model = await CarModel.create(req.body);
  res.status(201).json(model);
};

export const updateModel = async (req, res) => {
  const model = await CarModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!model) return res.status(404).json({ message: "Model not found" });
  res.json(model);
};

export const deleteModel = async (req, res) => {
  const model = await CarModel.findByIdAndDelete(req.params.id);
  if (!model) return res.status(404).json({ message: "Model not found" });
  res.json({ message: "Deleted" });
};

