import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import contactRoutes from './routes/contactRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import carRoutes from './routes/carRoutes.js'
import { errorHandler, corsMiddleware } from './middleware/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(corsMiddleware)

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Revora Motors API is running',
    timestamp: new Date().toISOString(),
  })
})

// API Routes
app.use('/api', contactRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/cars', carRoutes)

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🚗 Welcome to Revora Motors API',
    version: '1.0.0',
    endpoints: {
      contact: '/api/contact',
      admin: '/api/admin',
      health: '/health',
    },
  })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// Error Handler
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   🚗 Revora Motors Backend Server 🚗      ║
║   ✅ Server running on port ${PORT}       ║
║   ✅ Database connected                   ║
╚════════════════════════════════════════════╝
  `)
})

export default app
