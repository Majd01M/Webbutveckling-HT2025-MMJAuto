import mongoose from 'mongoose'

const PartSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    description: String,
    imageUrl: String,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

export default mongoose.model('Part', PartSchema)

