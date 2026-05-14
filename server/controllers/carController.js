import Car from '../models/Car.js'

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
      features,
      description,
      imageUrl,
      status,
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
    } = req.body

    // Validation
    if (!name || !year || !price || !mileage || !fuel || !transmission || !color) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    const car = new Car({
      name,
      year,
      price,
      mileage,
      fuel,
      transmission,
      color,
      features: features || [],
      description,
      imageUrl,
      status: status || 'available',
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

    // Update fields
    car = Object.assign(car, req.body)
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
