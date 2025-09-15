import Wishlist from '../models/Wishlist.js'

export const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('parts')
  res.json(wishlist || { user: req.user.id, parts: [] })
}

export const addToWishlist = async (req, res) => {
  const { partId } = req.body
  let wishlist = await Wishlist.findOne({ user: req.user.id })
  if (!wishlist) wishlist = await Wishlist.create({ user: req.user.id, parts: [] })

  if (!wishlist.parts.includes(partId)) {
    wishlist.parts.push(partId)
    await wishlist.save()
  }
  res.json(wishlist)
}

export const removeFromWishlist = async (req, res) => {
  const { partId } = req.params
  const wishlist = await Wishlist.findOne({ user: req.user.id })
  if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' })

  wishlist.parts = wishlist.parts.filter((id) => id.toString() !== partId)
  await wishlist.save()
  res.json(wishlist)
}

