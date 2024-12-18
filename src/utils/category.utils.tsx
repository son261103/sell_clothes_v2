// Hàm kiểm tra lỗi trong response từ API
export const formatCategoryError = (error: unknown): { message: string; statusCode: number } => {
    let message = "An unexpected error occurred.";
    let statusCode = 500;

    if (error instanceof Error) {
        // Nếu error là một instance của Error (chẳng hạn như Error object)
        message = error.message;
    } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const typedError = error as { response?: { status: number; data: { message: string } } };
        statusCode = typedError?.response?.status ?? 500;
        message = typedError?.response?.data?.message ?? "An unexpected error occurred.";
    }

    return {message, statusCode};
};


