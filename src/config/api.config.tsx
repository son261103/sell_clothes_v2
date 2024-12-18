import axios from 'axios';

// Thiết lập URL gốc của API từ biến môi trường hoặc giá trị mặc định
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

// cấu hình
const apiConfig = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiConfig;
