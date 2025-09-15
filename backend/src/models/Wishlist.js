import mongoose from 'mongoose'

const WishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }]
  },
  { timestamps: true }
)

export default mongoose.model('Wishlist', WishlistSchema)

