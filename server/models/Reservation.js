import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    carName: {
      type: String,
      required: true,
      trim: true,
    },
    carYear: {
      type: Number,
      default: null,
    },
    carPrice: {
      type: Number,
      default: null,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
      maxlength: [30, 'Phone number cannot be more than 30 characters'],
    },
    note: {
      type: String,
      default: '',
      trim: true,
      maxlength: [2000, 'Note cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['reserved', 'cancelled', 'sold'],
      default: 'reserved',
    },
    reservedAt: {
      type: Date,
      default: Date.now,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
)

const Reservation = mongoose.model('Reservation', reservationSchema)
export default Reservation