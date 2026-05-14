import Admin from '../models/Admin.js'
import jwt from 'jsonwebtoken'

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      })
    }

    // Find admin with password
    const admin = await Admin.findOne({ email }).select('+password')

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Compare password
    const isPasswordCorrect = await admin.comparePassword(password)

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: error.message,
    })
  }
}

// Get admin profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id)

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      })
    }

    res.status(200).json({
      success: true,
      data: admin,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin profile',
      error: error.message,
    })
  }
}

// Initialize admin user
export const initializeAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL })

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin user already exists',
      })
    }

    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: 'Pramukh Admin',
      role: 'super_admin',
    })

    res.status(201).json({
      success: true,
      message: 'Admin user initialized successfully',
      data: {
        email: admin.email,
        name: admin.name,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to initialize admin',
      error: error.message,
    })
  }
}
