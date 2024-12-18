// API Endpoints
export const ORDER_API_ENDPOINTS = {
    // Basic CRUD endpoints
    GET_ALL_ORDERS: "/admin/orders",
    GET_ORDER_BY_ID: (id: number) => `/admin/orders/${id}`,
    CREATE_ORDER: "/api/v1/orders",
    UPDATE_ORDER: (id: number) => `/admin/orders/${id}`,
    DELETE_ORDER: (id: number) => `/admin/orders/${id}`,

    // User specific endpoints
    GET_ORDERS_BY_USER_ID: (userId: number) => `/admin/orders/user/${userId}`,

    // Status and search endpoints
    UPDATE_ORDER_STATUS: (id: number) => `/admin/orders/${id}/status`,
    SEARCH_ORDERS: "/admin/orders/search",
    GET_ORDERS_BY_DATE_RANGE: "/admin/orders/date-range",
    GET_ORDERS_BY_AMOUNT_RANGE: "/admin/orders/amount-range",

    // Statistics endpoints
    GET_ORDER_STATISTICS: "/admin/orders/statistics",
    GET_TOTAL_AMOUNT_BY_STATUS: "/admin/orders/total-amount",
    GET_TOP_ORDERS: "/admin/orders/top-orders"
};

// Error Messages
export const ORDER_ERROR_MESSAGES = {
    GENERAL: "An error occurred while processing the order data.",
    CREATION: "Failed to create the order. Please check your input and try again.",
    UPDATE: "Failed to update the order. Please check your input and try again.",
    DELETION: "Failed to delete the order. Please try again.",
    SEARCH: "An error occurred while searching for orders.",
    STATUS_UPDATE: "Failed to update order status.",
    NOT_FOUND: "Order not found.",
    INVALID_STATUS: "Invalid order status provided.",
    INVALID_DATE_RANGE: "Invalid date range provided.",
    INVALID_AMOUNT_RANGE: "Invalid amount range provided.",
    USER_NOT_FOUND: "User not found.",
    UNAUTHORIZED: "You are not authorized to perform this action."
};

// Order Status Constants
export const ORDER_STATUS = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    CONFIRMED: 'CONFIRMED',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
    REFUNDED: 'REFUNDED'
} as const;


