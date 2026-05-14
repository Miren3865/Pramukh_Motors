import express from 'express'
import {
  getAllCars,
  getCarById,
  reserveCar,
  createCar,
  updateCar,
  deleteCar,
  getCarsByStatus,
  getCarStats,
} from '../controllers/carController.js'
import { authMiddleware } from '../middleware/auth.js'
import { uploadCarImages, handleUploadError } from '../middleware/upload.js'

const router = express.Router()

// Public routes
router.get('/', getAllCars)
router.get('/stats', getCarStats)
router.get('/status/:status', getCarsByStatus)
router.get('/:id', getCarById)
router.patch('/:id/reserve', reserveCar)

// Protected routes (admin only)
router.post('/', authMiddleware, uploadCarImages, handleUploadError, createCar)
router.put('/:id', authMiddleware, uploadCarImages, handleUploadError, updateCar)
router.delete('/:id', authMiddleware, deleteCar)

export default router
