// API Endpoints
export const ORDER_ITEM_API_ENDPOINTS = {
    // Basic CRUD endpoints
    GET_ORDER_ITEMS: (orderId: number) => `/admin/orders/${orderId}/items`,
    GET_ORDER_ITEM: (orderId: number, productId: number) => `/admin/orders/${orderId}/items/${productId}`,
    CREATE_ORDER_ITEM: (orderId: number) => `/admin/orders/${orderId}/items`,
    UPDATE_ORDER_ITEM: (orderId: number, productId: number) => `/admin/orders/${orderId}/items/${productId}`,
    DELETE_ORDER_ITEM: (orderId: number, productId: number) => `/admin/orders/${orderId}/items/${productId}`,

    // Batch operations
    BULK_CREATE_ORDER_ITEMS: (orderId: number) => `/admin/orders/${orderId}/items/bulk`,
    BULK_UPDATE_ORDER_ITEMS: (orderId: number) => `/admin/orders/${orderId}/items/bulk-update`,

    // Statistics endpoints
    GET_ORDER_ITEM_STATISTICS: (orderId: number) => `/admin/orders/${orderId}/items/statistics`,
    GET_TOP_SELLING_PRODUCTS: '/admin/order-items/top-selling'
};

// Error Messages
export const ORDER_ITEM_ERROR_MESSAGES = {
    GENERAL: "An error occurred while processing the order item data.",
    CREATION: "Failed to create the order item. Please check your input and try again.",
    UPDATE: "Failed to update the order item. Please check your input and try again.",
    DELETION: "Failed to delete the order item. Please try again.",
    NOT_FOUND: "Order item not found.",
    INVALID_QUANTITY: "Invalid quantity specified. Quantity must be between 1 and 100.",
    INVALID_PRICE: "Invalid price specified. Price must be greater than 0.",
    PRODUCT_NOT_FOUND: "Product not found or unavailable.",
    INSUFFICIENT_STOCK: "Insufficient stock available for the requested quantity.",
    DUPLICATE_PRODUCT: "This product is already in the order. Please update the existing item instead.",
    BULK_OPERATION_FAILED: "Failed to process bulk operation for order items.",
    ORDER_NOT_FOUND: "Parent order not found."
};

