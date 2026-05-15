import Car from '../models/Car.js'
import Reservation from '../models/Reservation.js'

// Get all cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    })
  } catch (error) {
    console.error('Get cars error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cars',
      error: error.message,
    })
  }
}

// Get all cars for public browse page (includes all uploaded cars)
export const getAllCarsPublicPage = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    })
  } catch (error) {
    console.error('Get all cars public page error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all cars',
      error: error.message,
    })
  }
}

// Get single car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found',
      })
    }

    res.status(200).json({
      success: true,
      data: car,
    })
  } catch (error) {
    console.error('Get car error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch car',
      error: error.message,
    })
  }
}

// Reserve car (public)
export const reserveCar = async (req, res) => {
  try {
    const { id } = req.params

    const reservedCar = await Car.findOneAndUpdate(
      { _id: id, status: 'available' },
      { status: 'reserved' },
      { new: true }
    )

    if (!reservedCar) {
      const existingCar = await Car.findById(id)

      if (!existingCar) {
        return res.status(404).json({
          success: false,
          message: 'Car not found',
        })
      }

      return res.status(400).json({
        success: false,
        message: `Car is already ${existingCar.status}`,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Car reserved successfully',
      data: reservedCar,
    })
  } catch (error) {
    console.error('Reserve car error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to reserve car',
      error: error.message,
    })
  }
}

// Create new car
export const createCar = async (req, res) => {
  try {
    const {
      name,
      year,
      price,
      mileage,
      fuel,
      transmission,
      color,
      vehicleType,
      registrationYear,
      registrationState,
      ownership,
      peakTorque,
      drive,
      features,
      description,
      imageUrl,
      status,
      showOnUser,
      engineSize,
      horsepower,
      acceleration,
      topSpeed,
      fuelConsumption,
      doors,
      seats,
      trunk,
      warranty,
      serviceHistory,
      brand,
      location,
    } = req.body

    // Validation
    if (!name || !year || !price || !mileage || !fuel || !transmission || !color) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    const showOnUserFlag = showOnUser === 'true' || showOnUser === true
    if (showOnUserFlag) {
      const visibleCount = await Car.countDocuments({ showOnUser: true })
      if (visibleCount >= 6) {
        return res.status(400).json({
          success: false,
          message: 'Maximum 6 public cars allowed',
        })
      }
    }

    // Handle uploaded images
    let galleryImages = []
    let thumbnailImage = null
    let featuredImage = null

    if (req.files) {
      if (req.files.gallery) {
        galleryImages = req.files.gallery.map(file => file.path)
      }
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        thumbnailImage = req.files.thumbnail[0].path
      }
      if (!thumbnailImage && galleryImages.length > 0) {
        thumbnailImage = galleryImages[0]
      }
      if (req.files.featured && req.files.featured[0]) {
        featuredImage = req.files.featured[0].path
      }
    }

    const car = new Car({
      name,
      year,
      price,
      mileage,
      fuel,
      transmission,
      color,
      vehicleType,
      registrationYear,
      registrationState,
      ownership,
      peakTorque,
      drive,
      features: features ? (Array.isArray(features) ? features : features.split(',').map(f => f.trim())) : [],
      description,
      imageUrl: imageUrl || thumbnailImage, // Backward compatibility
      galleryImages,
      thumbnailImage,
      featuredImage,
      status: status || 'available',
      showOnUser: showOnUser === 'true' || showOnUser === true,
      engineSize,
      horsepower,
      acceleration,
      topSpeed,
      fuelConsumption,
      doors,
      seats,
      trunk,
      warranty,
      serviceHistory: serviceHistory !== undefined ? serviceHistory : true,
      brand,
      location,
    })

    await car.save()

    res.status(201).json({
      success: true,
      message: 'Car added successfully',
      data: car,
    })
  } catch (error) {
    console.error('Create car error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create car',
      error: error.message,
    })
  }
}

// Update car
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params

    let car = await Car.findById(id)

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found',
      })
    }

    const wasSold = car.status === 'sold'
    const willBeSold = req.body.status === 'sold'

    // Handle uploaded images
    let newGalleryImages = []
    if (req.files) {
      if (req.files.gallery) {
        newGalleryImages = req.files.gallery.map(file => file.path)
      }
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        car.thumbnailImage = req.files.thumbnail[0].path
        car.imageUrl = car.thumbnailImage // Update legacy field
      }
      if (req.files.featured && req.files.featured[0]) {
        car.featuredImage = req.files.featured[0].path
      }
    }

    // Handle retained existing images sent from frontend
    if (req.body.retainedGalleryImages) {
      try {
        const retained = JSON.parse(req.body.retainedGalleryImages)
        car.galleryImages = [...retained, ...newGalleryImages]
        delete req.body.retainedGalleryImages // Remove to prevent Object.assign overwrite
      } catch (e) {
        console.error('Error parsing retainedGalleryImages:', e)
        car.galleryImages = [...(car.galleryImages || []), ...newGalleryImages]
      }
    } else {
      car.galleryImages = [...(car.galleryImages || []), ...newGalleryImages]
    }

    // Handle features array
    if (req.body.features && typeof req.body.features === 'string') {
      req.body.features = req.body.features.split(',').map(f => f.trim())
    }

    // Handle boolean toggle values coming from form data
    if (req.body.showOnUser !== undefined) {
      req.body.showOnUser = req.body.showOnUser === 'true' || req.body.showOnUser === true
    }

    if (req.body.showOnUser === true && !car.showOnUser) {
      const visibleCount = await Car.countDocuments({ showOnUser: true })
      if (visibleCount >= 6) {
        return res.status(400).json({
          success: false,
          message: 'Maximum 6 public cars allowed',
        })
      }
    }

    // Update fields
    car = Object.assign(car, req.body)

    if (!wasSold && willBeSold) {
      await Reservation.updateMany(
        { carId: car._id, status: 'reserved' },
        { status: 'sold' }
      )
    }

    await car.save()

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      data: car,
    })
  } catch (error) {
    console.error('Update car error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update car',
      error: error.message,
    })
  }
}

// Delete car
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params

    const car = await Car.findByIdAndDelete(id)

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
      data: car,
    })
  } catch (error) {
    console.error('Delete car error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete car',
      error: error.message,
    })
  }
}

// Get cars by status
export const getCarsByStatus = async (req, res) => {
  try {
    const { status } = req.params

    const cars = await Car.find({ status }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    })
  } catch (error) {
    console.error('Get cars by status error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cars',
      error: error.message,
    })
  }
}

// Get car statistics
export const getCarStats = async (req, res) => {
  try {
    const totalCars = await Car.countDocuments()
    const availableCars = await Car.countDocuments({ status: 'available' })
    const soldCars = await Car.countDocuments({ status: 'sold' })
    const reservedCars = await Car.countDocuments({ status: 'reserved' })

    res.status(200).json({
      success: true,
      data: {
        totalCars,
        availableCars,
        soldCars,
        reservedCars,
      },
    })
  } catch (error) {
    console.error('Get car stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message,
    })
  }
}
