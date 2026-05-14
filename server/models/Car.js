import mongoose from 'mongoose'

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Car name is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: 1990,
      max: new Date().getFullYear() + 1,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    mileage: {
      type: Number,
      required: [true, 'Mileage is required'],
      min: 0,
    },
    fuel: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric'],
      required: [true, 'Fuel type is required'],
    },
    transmission: {
      type: String,
      enum: ['Manual', 'Automatic'],
      required: [true, 'Transmission type is required'],
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
    },
    vehicleType: {
      type: String,
      trim: true,
      default: null,
    },
    registrationYear: {
      type: Number,
      min: 1990,
      max: new Date().getFullYear() + 1,
      default: null,
    },
    registrationState: {
      type: String,
      trim: true,
      default: null,
    },
    ownership: {
      type: String,
      trim: true,
      default: null,
    },
    peakTorque: {
      type: String,
      default: null,
    },
    drive: {
      type: String,
      trim: true,
      default: null,
    },
    features: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    thumbnailImage: {
      type: String,
      default: null,
    },
    featuredImage: {
      type: String,
      default: null,
    },
    brand: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'reserved'],
      default: 'available',
    },
    showOnUser: {
      type: Boolean,
      default: false,
    },
    engineSize: {
      type: String,
      default: null,
    },
    horsepower: {
      type: Number,
      default: null,
    },
    acceleration: {
      type: String,
      default: null,
    },
    topSpeed: {
      type: String,
      default: null,
    },
    fuelConsumption: {
      type: String,
      default: null,
    },
    doors: {
      type: Number,
      enum: [2, 4, 5],
      default: 4,
    },
    seats: {
      type: Number,
      min: 2,
      max: 8,
      default: 5,
    },
    trunk: {
      type: String,
      default: null,
    },
    warranty: {
      type: String,
      default: null,
    },
    serviceHistory: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Car', carSchema)
