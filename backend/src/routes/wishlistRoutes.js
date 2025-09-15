import { Router } from 'express'
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, getWishlist)
router.post('/', requireAuth, addToWishlist)
router.delete('/:partId', requireAuth, removeFromWishlist)

export default router

