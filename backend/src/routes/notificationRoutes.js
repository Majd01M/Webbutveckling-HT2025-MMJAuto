import { Router } from 'express'
import { listNotifications, markAsRead } from '../controllers/notificationController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, listNotifications)
router.put('/:id/read', requireAuth, markAsRead)

export default router

