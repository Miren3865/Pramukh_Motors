import express from 'express'
import {
  submitContact,
  getAllContacts,
  getContact,
  deleteContact,
  getStats,
} from '../controllers/contactController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.post('/contact', submitContact)

// Protected routes
router.get('/admin/contacts', authMiddleware, getAllContacts)
router.get('/admin/contacts/:id', authMiddleware, getContact)
router.delete('/admin/contacts/:id', authMiddleware, deleteContact)
router.get('/admin/stats', authMiddleware, getStats)

export default router
