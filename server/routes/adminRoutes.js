import express from 'express'
import {
  loginAdmin,
  getAdminProfile,
  initializeAdmin,
} from '../controllers/adminController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.post('/login', loginAdmin)
router.post('/initialize', initializeAdmin)

// Protected routes
router.get('/profile', authMiddleware, getAdminProfile)

export default router
