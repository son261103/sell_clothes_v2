// Order Item DTO Interface
export interface OrderItemDTO {
    order_item_id?: number;
    orderId: number;
    productId: number;
    productName?: string;
    quantity: number;
    price: number;
    subtotal?: number;
    createdAt?: string;
    updatedAt?: string;
}

// API Request Interfaces
export interface CreateOrderItemRequest {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
}

export interface UpdateOrderItemRequest {
    quantity?: number;
    price?: number;
}

// Search Parameters Interface
export interface OrderItemSearchParams {
    orderId?: number;
    productId?: number;
    minQuantity?: number;
    maxQuantity?: number;
    minPrice?: number;
    maxPrice?: number;
    startDate?: string;
    endDate?: string;
}

// Order Item Statistics Interface
export interface OrderItemStatistics {
    totalItems: number;
    totalQuantity: number;
    totalAmount: number;
    averageQuantityPerOrder: number;
    averagePricePerItem: number;
    productDistribution: Record<number, number>;
}

// API Service Interface
export interface OrderItemService {
    // Basic CRUD operations
    getOrderItemsByOrderId(orderId: number): Promise<OrderItemDTO[]>;

    getOrderItemByOrderIdAndProductId(
        orderId: number,
        productId: number
    ): Promise<OrderItemDTO>;

    createOrderItem(
        orderId: number,
        request: CreateOrderItemRequest
    ): Promise<OrderItemDTO>;

    updateOrderItem(
        orderId: number,
        productId: number,
        request: UpdateOrderItemRequest
    ): Promise<OrderItemDTO>;

    deleteOrderItem(
        orderId: number,
        productId: number
    ): Promise<void>;

    // Batch operations
    bulkCreateOrderItems(
        orderId: number,
        items: CreateOrderItemRequest[]
    ): Promise<OrderItemDTO[]>;

    bulkUpdateOrderItems(
        orderId: number,
        items: Array<{
            productId: number;
            request: UpdateOrderItemRequest;
        }>
    ): Promise<OrderItemDTO[]>;

    // Statistics and analytics
    getOrderItemStatistics(orderId: number): Promise<OrderItemStatistics>;

    getTopSellingProducts(
        startDate: string,
        endDate: string,
        limit: number
    ): Promise<Array<{
        productId: number;
        productName: string;
        totalQuantity: number;
        totalAmount: number;
    }>>;
}

// Pagination Interface
export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

// Response Interfaces
export interface OrderItemResponse {
    success: boolean;
    message: string;
    data: OrderItemDTO;
}

export interface OrderItemListResponse {
    success: boolean;
    message: string;
    data: OrderItemDTO[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    };
}

// Error Interfaces
export interface OrderItemError {
    code: string;
    message: string;
    details?: {
        field: string;
        message: string;
    }[];
}

// Validation Constants
export const ORDER_ITEM_VALIDATION = {
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 100,
    MIN_PRICE: 0,
    MAX_ITEMS_PER_ORDER: 50
} as const;

// Status Constants
export const ORDER_ITEM_STATUS = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CANCELLED: 'CANCELLED'
} as const;

export type OrderItemStatus = typeof ORDER_ITEM_STATUS[keyof typeof ORDER_ITEM_STATUS];