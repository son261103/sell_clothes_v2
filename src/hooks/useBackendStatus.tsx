// src/hooks/useBackendStatus.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useBackendStatus = (interval = 1000000) => {
    const [isConnected, setIsConnected] = useState<boolean | null>(null); // null là trạng thái mặc định
    const navigate = useNavigate();

    useEffect(() => {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v2';

        const checkConnection = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/healthcheck`, { method: 'GET' });
                if (response.ok) {
                    setIsConnected(true);
                } else {
                    console.error('Healthcheck failed:', response.status);
                    setIsConnected(false); // API trả về lỗi khác
                }
            } catch (err) {
                console.error('Error connecting to backend:', err);
                setIsConnected(false); // Không thể kết nối tới API
            }
        };

        // Kiểm tra ngay lập tức
        checkConnection();

        // Kiểm tra định kỳ
        const intervalId = setInterval(checkConnection, interval);

        return () => clearInterval(intervalId); // Xóa interval khi component bị unmount
    }, [interval]);

    useEffect(() => {
        if (isConnected === false) {
            navigate('/404'); // Điều hướng đến trang 404 khi không kết nối
        }
    }, [isConnected, navigate]);

    return isConnected;
};

export default useBackendStatus;
