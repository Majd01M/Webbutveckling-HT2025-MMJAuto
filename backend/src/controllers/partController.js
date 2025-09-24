import CarPart from "../models/CarPart.js";

export const listParts = async (req, res) => {
  const {
    search,
    category,
    modelId,
    minPrice,
    maxPrice,
    sort = "name",
    page = 1,
    limit = 12
  } = req.query;

  const filter = {};
  if (search) {
    filter.$text = { $search: search };
  }
  if (category) filter.category = new RegExp(category, "i");
  if (modelId) filter.compatibleModels = modelId;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    CarPart.find(filter)
      .populate("compatibleModels")
      .sort(sort.replace(",", " "))
      .skip(skip)
      .limit(Number(limit)),
    CarPart.countDocuments(filter)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};

export const getPart = async (req, res) => {
  const part = await CarPart.findById(req.params.id).populate("compatibleModels");
  if (!part) return res.status(404).json({ message: "Part not found" });
  res.json(part);
};

export const createPart = async (req, res) => {
  const part = await CarPart.create(req.body);
  res.status(201).json(part);
};

export const updatePart = async (req, res) => {
  const part = await CarPart.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!part) return res.status(404).json({ message: "Part not found" });
  res.json(part);
};

export const deletePart = async (req, res) => {
  const part = await CarPart.findByIdAndDelete(req.params.id);
  if (!part) return res.status(404).json({ message: "Part not found" });
  res.json({ message: "Deleted" });
};

