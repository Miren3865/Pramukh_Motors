import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/database.js'
import contactRoutes from './routes/contactRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import carRoutes from './routes/carRoutes.js'
import { errorHandler, corsMiddleware } from './middleware/auth.js'
import { handleUploadError } from './middleware/upload.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '.env') })

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
    message: 'Pramukh Motors API is running',
    timestamp: new Date().toISOString(),
  })
})

// API Routes
app.use('/api', contactRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/cars', carRoutes)

// Upload error handling
app.use(handleUploadError)

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🚗 Welcome to Pramukh Motors API',
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
║   🚗 Pramukh Motors Backend Server 🚗      ║
║   ✅ Server running on port ${PORT}       ║
║   ✅ Database connected                   ║
╚════════════════════════════════════════════╝
  `)
})

export default app
