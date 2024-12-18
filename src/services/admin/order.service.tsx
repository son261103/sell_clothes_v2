import adminApi from "../../config/admin.api.config";
import {
    ORDER_API_ENDPOINTS,
    ORDER_ERROR_MESSAGES
} from "../../constants/order.constant";
import {
    OrderDTO,
    CreateOrderRequest,
    UpdateOrderRequest,
    OrderSearchParams,
    Page,
    OrderStatistics
} from "../../types/order.types";

class OrderService {
    async getAllOrders(page: number, size: number): Promise<Page<OrderDTO>> {
        try {
            const response = await adminApi.get<Page<OrderDTO>>(ORDER_API_ENDPOINTS.GET_ALL_ORDERS, {
                params: { page, size }
            });
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.GENERAL, err);
            throw new Error(ORDER_ERROR_MESSAGES.GENERAL);
        }
    }

    async getOrderById(orderId: number): Promise<OrderDTO> {
        try {
            const response = await adminApi.get<OrderDTO>(ORDER_API_ENDPOINTS.GET_ORDER_BY_ID(orderId));
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.GENERAL, err);
            throw new Error(ORDER_ERROR_MESSAGES.GENERAL);
        }
    }

    async createOrder(request: CreateOrderRequest): Promise<OrderDTO> {
        try {
            const response = await adminApi.post<OrderDTO>(ORDER_API_ENDPOINTS.CREATE_ORDER, request);
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.CREATION, err);
            throw new Error(ORDER_ERROR_MESSAGES.CREATION);
        }
    }

    async updateOrder(orderId: number, request: UpdateOrderRequest): Promise<OrderDTO> {
        try {
            const response = await adminApi.put<OrderDTO>(
                ORDER_API_ENDPOINTS.UPDATE_ORDER(orderId),
                request
            );
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.UPDATE, err);
            throw new Error(ORDER_ERROR_MESSAGES.UPDATE);
        }
    }

    async deleteOrder(orderId: number): Promise<void> {
        try {
            await adminApi.delete(ORDER_API_ENDPOINTS.DELETE_ORDER(orderId));
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.DELETION, err);
            throw new Error(ORDER_ERROR_MESSAGES.DELETION);
        }
    }

    async getOrdersByUserId(userId: number, page: number, size: number): Promise<Page<OrderDTO>> {
        try {
            const response = await adminApi.get<Page<OrderDTO>>(
                ORDER_API_ENDPOINTS.GET_ORDERS_BY_USER_ID(userId),
                { params: { page, size } }
            );
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.GENERAL, err);
            throw new Error(ORDER_ERROR_MESSAGES.GENERAL);
        }
    }

    async updateOrderStatus(orderId: number, status: string): Promise<OrderDTO> {
        try {
            const response = await adminApi.patch<OrderDTO>(
                ORDER_API_ENDPOINTS.UPDATE_ORDER_STATUS(orderId),
                null,
                { params: { status } }
            );
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.STATUS_UPDATE, err);
            throw new Error(ORDER_ERROR_MESSAGES.STATUS_UPDATE);
        }
    }

    async searchOrders(params: OrderSearchParams, page: number, size: number): Promise<Page<OrderDTO>> {
        try {
            const response = await adminApi.get<Page<OrderDTO>>(ORDER_API_ENDPOINTS.SEARCH_ORDERS, {
                params: { ...params, page, size }
            });
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.SEARCH, err);
            throw new Error(ORDER_ERROR_MESSAGES.SEARCH);
        }
    }

    async getOrdersByDateRange(startDate: string, endDate: string): Promise<OrderDTO[]> {
        try {
            const response = await adminApi.get<OrderDTO[]>(ORDER_API_ENDPOINTS.GET_ORDERS_BY_DATE_RANGE, {
                params: { startDate, endDate }
            });
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.INVALID_DATE_RANGE, err);
            throw new Error(ORDER_ERROR_MESSAGES.INVALID_DATE_RANGE);
        }
    }

    async getOrdersByAmountRange(minAmount: number, maxAmount: number): Promise<OrderDTO[]> {
        try {
            const response = await adminApi.get<OrderDTO[]>(ORDER_API_ENDPOINTS.GET_ORDERS_BY_AMOUNT_RANGE, {
                params: { minAmount, maxAmount }
            });
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.INVALID_AMOUNT_RANGE, err);
            throw new Error(ORDER_ERROR_MESSAGES.INVALID_AMOUNT_RANGE);
        }
    }

    async getOrderStatistics(): Promise<OrderStatistics> {
        try {
            const response = await adminApi.get<OrderStatistics>(ORDER_API_ENDPOINTS.GET_ORDER_STATISTICS);
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.GENERAL, err);
            throw new Error(ORDER_ERROR_MESSAGES.GENERAL);
        }
    }

    async getTotalAmountByStatus(status: string): Promise<number> {
        try {
            const response = await adminApi.get<number>(ORDER_API_ENDPOINTS.GET_TOTAL_AMOUNT_BY_STATUS, {
                params: { status }
            });
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.INVALID_STATUS, err);
            throw new Error(ORDER_ERROR_MESSAGES.INVALID_STATUS);
        }
    }

    async getTopOrdersByAmount(
        startDate: string,
        endDate: string,
        status: string,
        limit: number
    ): Promise<OrderDTO[]> {
        try {
            const response = await adminApi.get<OrderDTO[]>(ORDER_API_ENDPOINTS.GET_TOP_ORDERS, {
                params: { startDate, endDate, status, limit }
            });
            return response.data;
        } catch (err) {
            console.error(ORDER_ERROR_MESSAGES.GENERAL, err);
            throw new Error(ORDER_ERROR_MESSAGES.GENERAL);
        }
    }
}

export const orderService = new OrderService();