import Part from '../models/Part.js'

export const listParts = async (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query
  const filter = { isActive: true }

  if (q) filter.name = { $regex: q, $options: 'i' }
  if (category) filter.category = category
  if (minPrice || maxPrice) {
    filter.price = {
      ...(minPrice ? { $gte: Number(minPrice) } : {}),
      ...(maxPrice ? { $lte: Number(maxPrice) } : {})
    }
  }

  const parts = await Part.find(filter).limit(100)
  res.json(parts)
}

export const getPart = async (req, res) => {
  const part = await Part.findById(req.params.id)
  if (!part) return res.status(404).json({ message: 'Part not found' })
  res.json(part)
}

export const createPart = async (req, res) => {
  const part = await Part.create(req.body)
  res.status(201).json(part)
}

export const updatePart = async (req, res) => {
  const part = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!part) return res.status(404).json({ message: 'Part not found' })
  res.json(part)
}

export const removePart = async (req, res) => {
  const part = await Part.findByIdAndDelete(req.params.id)
  if (!part) return res.status(404).json({ message: 'Part not found' })
  res.json({ ok: true })
}

