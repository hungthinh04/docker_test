import axios from "axios";

// Tạo axios instance với base URL từ environment variable
// Development: dùng proxy từ vite.config.js (/api)
// Production: dùng VITE_API_URL hoặc /api
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    // Remove trailing slash nếu có, rồi thêm /api
    const url = import.meta.env.VITE_API_URL.replace(/\/+$/, "");
    return `${url}/api`;
  }
  return "/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
