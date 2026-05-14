import Car from '../models/Car.js'
import Reservation from '../models/Reservation.js'

export const getAllReservations = async (req, res) => {
	try {
		const reservations = await Reservation.find().sort({ createdAt: -1 })

		res.status(200).json({
			success: true,
			count: reservations.length,
			data: reservations,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to fetch reservations',
			error: error.message,
		})
	}
}

export const createReservation = async (req, res) => {
	try {
		const {
			carId,
			carName,
			carYear,
			carPrice,
			customerName,
			customerEmail,
			customerPhone,
			note,
		} = req.body

		if (!carId || !carName || !customerName || !customerEmail || !customerPhone) {
			return res.status(400).json({
				success: false,
				message: 'Please provide all required reservation details',
			})
		}

		const car = await Car.findById(carId)

		if (!car) {
			return res.status(404).json({
				success: false,
				message: 'Car not found',
			})
		}

		if (car.status !== 'available') {
			return res.status(400).json({
				success: false,
				message: `Car is already ${car.status}`,
			})
		}

		const reservation = await Reservation.create({
			carId,
			carName,
			carYear,
			carPrice,
			customerName,
			customerEmail,
			customerPhone,
			note: note || '',
		})

		car.status = 'reserved'
		await car.save()

		res.status(201).json({
			success: true,
			message: 'Reservation created successfully',
			data: reservation,
			car,
		})
	} catch (error) {
		console.error('Create reservation error:', error)
		res.status(500).json({
			success: false,
			message: 'Failed to create reservation',
			error: error.message,
		})
	}
}

export const cancelReservation = async (req, res) => {
	try {
		const { id } = req.params

		const reservation = await Reservation.findById(id)

		if (!reservation) {
			return res.status(404).json({
				success: false,
				message: 'Reservation not found',
			})
		}

		if (reservation.status === 'cancelled') {
			return res.status(400).json({
				success: false,
				message: 'Reservation is already cancelled',
			})
		}

		if (reservation.status === 'sold') {
			return res.status(400).json({
				success: false,
				message: 'Sold reservations cannot be cancelled',
			})
		}

		reservation.status = 'cancelled'
		reservation.cancelledAt = new Date()
		await reservation.save()

		const car = await Car.findById(reservation.carId)
		if (car && car.status === 'reserved') {
			car.status = 'available'
			await car.save()
		}

		res.status(200).json({
			success: true,
			message: 'Reservation cancelled successfully',
			data: reservation,
			car,
		})
	} catch (error) {
		console.error('Cancel reservation error:', error)
		res.status(500).json({
			success: false,
			message: 'Failed to cancel reservation',
			error: error.message,
		})
	}
}

export const deleteReservation = async (req, res) => {
	try {
		const { id } = req.params

		const reservation = await Reservation.findById(id)

		if (!reservation) {
			return res.status(404).json({
				success: false,
				message: 'Reservation not found',
			})
		}

		if (reservation.status !== 'cancelled') {
			const car = await Car.findById(reservation.carId)
			if (car && car.status === 'reserved') {
				car.status = 'available'
				await car.save()
			}
		}

		await Reservation.findByIdAndDelete(id)

		res.status(200).json({
			success: true,
			message: 'Reservation deleted successfully',
			data: reservation,
		})
	} catch (error) {
		console.error('Delete reservation error:', error)
		res.status(500).json({
			success: false,
			message: 'Failed to delete reservation',
			error: error.message,
		})
	}
}
