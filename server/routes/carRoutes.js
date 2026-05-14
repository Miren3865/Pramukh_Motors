import express from 'express'
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getCarsByStatus,
  getCarStats,
} from '../controllers/carController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getAllCars)
router.get('/stats', getCarStats)
router.get('/:id', getCarById)
router.get('/status/:status', getCarsByStatus)

// Protected routes (admin only)
router.post('/', authMiddleware, createCar)
router.put('/:id', authMiddleware, updateCar)
router.delete('/:id', authMiddleware, deleteCar)

export default router
