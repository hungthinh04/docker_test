import axios from 'axios'

// Tạo axios instance với base URL từ environment variable
// Development: dùng proxy từ vite.config.js (/api)
// Production: dùng VITE_API_URL hoặc /api
const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api

