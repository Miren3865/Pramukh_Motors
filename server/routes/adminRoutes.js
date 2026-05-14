import express from 'express'
import {
  loginAdmin,
  getAdminProfile,
  initializeAdmin,
} from '../controllers/adminController.js'
import { getAllReservations, cancelReservation, deleteReservation } from '../controllers/reservationController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.post('/login', loginAdmin)
router.post('/initialize', initializeAdmin)

// Protected routes
router.get('/profile', authMiddleware, getAdminProfile)
router.get('/reservations', authMiddleware, getAllReservations)
router.patch('/reservations/:id/cancel', authMiddleware, cancelReservation)
router.delete('/reservations/:id', authMiddleware, deleteReservation)

export default router
