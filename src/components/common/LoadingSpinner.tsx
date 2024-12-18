import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
    const [isDarkMode] = useState<boolean>(() => {
        // Lấy trạng thái từ localStorage hoặc mặc định là false
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        // Áp dụng class "dark-mode" nếu theme là "dark"
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
        // Lưu trạng thái mới vào localStorage khi thay đổi theme
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <div
            className="vh-100 w-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: isDarkMode ? 'var(--dark-background-color)' : 'var(--background-color)' }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                backgroundColor: isDarkMode ? 'var(--dark-background-color)' : 'var(--background-color)',
                                color: isDarkMode ? 'var(--dark-text-color)' : 'var(--text-color)',
                                borderRadius: '15px',
                            }}
                        >
                            <div className="card-body p-5 text-center">
                                <div className="d-flex justify-content-center mb-4">
                                    <Loader2
                                        className="spinner-border"
                                        style={{
                                            width: '5rem',
                                            height: '5rem',
                                            color: 'var(--primary-color)',
                                        }}
                                    />
                                </div>
                                <p
                                    className="text-secondary mb-0"
                                    style={{
                                        animation: 'pulse 2s infinite',
                                        color: isDarkMode ? 'var(--dark-text-color)' : 'var(--text-color)',
                                        fontWeight: '500',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    Vui lòng đợi trong giây lát...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Thêm keyframes animation cho hiệu ứng pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: .6;
        }
        100% {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

export default LoadingSpinner;
