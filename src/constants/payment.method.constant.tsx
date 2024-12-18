// API Endpoints
export const PAYMENT_METHOD_API_ENDPOINTS = {
    // Basic CRUD endpoints
    GET_ALL_PAYMENT_METHODS: "/admin/payment-methods",
    GET_PAYMENT_METHOD_BY_ID: (id: number) => `/admin/payment-methods/${id}`,
    CREATE_PAYMENT_METHOD: "admin/payment-methods",
    UPDATE_PAYMENT_METHOD: (id: number) => `/admin/payment-methods/${id}`,
    DELETE_PAYMENT_METHOD: (id: number) => `/admin/payment-methods/${id}`,
    SEARCH_PAYMENT_METHODS: "/admin/payment-methods/search",
};

// Error Messages
export const PAYMENT_METHOD_ERROR_MESSAGE = "An error occurred while processing the payment method data.";
export const PAYMENT_METHOD_CREATION_ERROR_MESSAGE = "Failed to create the payment method. Please check your input and try again.";
export const PAYMENT_METHOD_UPDATE_ERROR_MESSAGE = "Failed to update the payment method. Please check your input and try again.";
export const PAYMENT_METHOD_DELETION_ERROR_MESSAGE = "Failed to delete the payment method. Please try again.";
export const PAYMENT_METHOD_SEARCH_ERROR_MESSAGE = "An error occurred while retrieving the payment method data.";

