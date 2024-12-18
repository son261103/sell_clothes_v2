// State Interface
export interface OrderState {
    orders: OrderDTO[];
    selectedOrder: OrderDTO | null;
    loading: boolean;
    error: string | null;
}

export const initialOrderState: OrderState = {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null
};

// Order DTO Interface
export interface OrderDTO {
    order_item_id?: number;
    userId: number;
    username?: string;
    orderDate: string;
    status: string;
    totalAmount: number;
    createdAt?: string;
    updatedAt?: string;
}

// API Request Interfaces
export interface CreateOrderRequest {
    userId: number;
    orderDate: string;
    status: string;
    totalAmount: number;
    username?: string;
}

export interface UpdateOrderRequest {
    order_item_id?: number;
    userId: number;
    username?: string;
    orderDate: string;
    status: string;
    totalAmount: number;
}

// Search Parameters Interface
export interface OrderSearchParams {
    userId?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
}

// Order Statistics Interface
export interface OrderStatistics {
    [key: string]: number;
}


export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

// API Service Interface
export interface OrderService {
    // Basic CRUD operations
    getAllOrders(page: number, size: number): Promise<Page<OrderDTO>>;

    getOrderById(orderId: number): Promise<OrderDTO>;

    createOrder(request: CreateOrderRequest): Promise<OrderDTO>;

    updateOrder(orderId: number, request: UpdateOrderRequest): Promise<OrderDTO>;

    deleteOrder(orderId: number): Promise<void>;

    // User specific operations
    getOrdersByUserId(userId: number, page: number, size: number): Promise<Page<OrderDTO>>;

    // Status operations
    updateOrderStatus(orderId: number, status: string): Promise<OrderDTO>;

    getTotalAmountByStatus(status: string): Promise<number>;

    // Search and filtering operations
    searchOrders(params: OrderSearchParams, page: number, size: number): Promise<Page<OrderDTO>>;

    getOrdersByDateRange(startDate: string, endDate: string): Promise<OrderDTO[]>;

    getOrdersByAmountRange(minAmount: number, maxAmount: number): Promise<OrderDTO[]>;

    // Statistics and analytics
    getOrderStatistics(): Promise<OrderStatistics>;

    getTopOrdersByAmount(startDate: string, endDate: string, status: string, limit: number): Promise<OrderDTO[]>;
}

// Pagination Interface
export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}