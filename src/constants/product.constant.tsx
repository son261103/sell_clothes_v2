// API Endpoints
export const PRODUCT_API_ENDPOINTS = {
    // Basic CRUD endpoints
    GET_ALL_PRODUCTS: "/admin/products",
    GET_PRODUCT_BY_ID: (productId: number) => `/admin/products/${productId}`,
    CREATE_PRODUCT: "/admin/products",
    UPDATE_PRODUCT: (productId: number) => `/admin/products/${productId}`,
    DELETE_PRODUCT: (productId: number) => `/admin/products/${productId}`,

    // Search and filter endpoints
    SEARCH_PRODUCTS: "/admin/products/search",
    GET_PRODUCTS_BY_CATEGORY: (categoryId: number) => `/admin/products/category/${categoryId}`,
    GET_PRODUCTS_BY_PRICE_RANGE: "/admin/products/filter/price",
    GET_PRODUCTS_BY_STOCK: "/admin/products/filter/stock"
};

// Error Messages
export const PRODUCT_ERROR_MESSAGE = "An error occurred while processing the product data.";
export const PRODUCT_CREATION_ERROR_MESSAGE = "Failed to create the product. Please check your input and try again.";
export const PRODUCT_UPDATE_ERROR_MESSAGE = "Failed to update the product. Please check your input and try again.";
export const PRODUCT_DELETION_ERROR_MESSAGE = "Failed to delete the product. Please try again.";
export const PRODUCT_SEARCH_ERROR_MESSAGE = "An error occurred while searching for products.";
export const PRODUCT_CATEGORY_ERROR_MESSAGE = "An error occurred while retrieving products by category.";
export const PRODUCT_PRICE_RANGE_ERROR_MESSAGE = "An error occurred while filtering products by price range.";
export const PRODUCT_STOCK_ERROR_MESSAGE = "An error occurred while retrieving products by stock level.";

// Validation Messages
export const PRODUCT_VALIDATION_MESSAGES = {
    INVALID_PRICE: "Please enter a valid price range.",
    INVALID_STOCK: "Please enter a valid stock quantity.",
    INVALID_IMAGE: "Please upload a valid image file.",
    INVALID_CATEGORY: "Please select a valid category.",
    REQUIRED_FIELDS: "Please fill in all required fields."
};

// Image Upload Constants
export const PRODUCT_IMAGE_CONFIG = {
    ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    UPLOAD_MESSAGE: "Please upload a product image (JPG, PNG or GIF, max 5MB)"
};

// API Response Messages
export const PRODUCT_SUCCESS_MESSAGES = {
    CREATE: "Product created successfully.",
    UPDATE: "Product updated successfully.",
    DELETE: "Product deleted successfully."
};