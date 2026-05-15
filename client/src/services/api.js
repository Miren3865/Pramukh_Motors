import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Contact API
export const submitContact = async (data) => {
  const response = await api.post('/contact', data)
  return response.data
}

// Admin API
export const loginAdmin = async (credentials) => {
  const response = await api.post('/admin/login', credentials)
  return response.data
}

export const getContacts = async () => {
  const response = await api.get('/admin/contacts')
  return response.data
}

export const deleteContact = async (id) => {
  const response = await api.delete(`/admin/contacts/${id}`)
  return response.data
}

export const getStats = async () => {
  const response = await api.get('/admin/stats')
  return response.data
}

export const getReservations = async () => {
  const response = await api.get('/admin/reservations')
  return response.data
}

export const cancelReservation = async (id) => {
  const response = await api.patch(`/admin/reservations/${id}/cancel`)
  return response.data
}

export const deleteReservation = async (id) => {
  const response = await api.delete(`/admin/reservations/${id}`)
  return response.data
}

// Car API
export const getAllCars = async () => {
  const response = await api.get('/cars')
  return response.data
}

export const getAllCarsAll = async () => {
  const response = await api.get('/cars/all')
  return response.data
}

export const getCarById = async (id) => {
  const response = await api.get(`/cars/${id}`)
  return response.data
}

export const createCar = async (data) => {
  const isFormData = data instanceof FormData
  const response = await api.post('/cars', data, {
    headers: isFormData ? {} : { 'Content-Type': 'application/json' }
  })
  return response.data
}

export const updateCar = async (id, data) => {
  const isFormData = data instanceof FormData
  const response = await api.put(`/cars/${id}`, data, {
    headers: isFormData ? {} : { 'Content-Type': 'application/json' }
  })
  return response.data
}

export const deleteCar = async (id) => {
  const response = await api.delete(`/cars/${id}`)
  return response.data
}

export const getCarsByStatus = async (status) => {
  const response = await api.get(`/cars/status/${status}`)
  return response.data
}

export const getCarStats = async () => {
  const response = await api.get('/cars/stats')
  return response.data
}

export const reserveCar = async (id) => {
  const response = await api.patch(`/cars/${id}/reserve`)
  return response.data
}

export const createReservation = async (data) => {
  const response = await api.post('/reservations', data)
  return response.data
}

export default api
