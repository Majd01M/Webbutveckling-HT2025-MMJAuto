import { Router } from 'express'
import { listParts, getPart, createPart, updatePart, removePart } from '../controllers/partController.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()

router.get('/', listParts)
router.get('/:id', getPart)

// Admin only
router.post('/', requireAuth, requireRole('admin'), createPart)
router.put('/:id', requireAuth, requireRole('admin'), updatePart)
router.delete('/:id', requireAuth, requireRole('admin'), removePart)

export default router

