import adminApi from "../../config/admin.api.config";
import { ORDER_ITEM_API_ENDPOINTS, ORDER_ITEM_ERROR_MESSAGES } from "../../constants/order.item.constant";
import {
    OrderItemDTO,
    CreateOrderItemRequest,
    UpdateOrderItemRequest,
    OrderItemStatistics,
    OrderItemService as IOrderItemService
} from "../../types/order.item.types";

class OrderItemService implements IOrderItemService {
    // Basic CRUD operations
    async getOrderItemsByOrderId(orderId: number): Promise<OrderItemDTO[]> {
        try {
            const response = await adminApi.get<OrderItemDTO[]>(
                ORDER_ITEM_API_ENDPOINTS.GET_ORDER_ITEMS(orderId)
            );
            return response.data;
        } catch (error) {
            console.error(ORDER_ITEM_ERROR_MESSAGES.GENERAL, error);
            throw new Error(ORDER_ITEM_ERROR_MESSAGES.GENERAL);
        }
    }

    async getOrderItemByOrderIdAndProductId(
        orderId: number,
        productId: number
    ): Promise<OrderItemDTO> {
        try {
            const response = await adminApi.get<OrderItemDTO>(
                ORDER_ITEM_API_ENDPOINTS.GET_ORDER_ITEM(orderId, productId)
            );
            return response.data;
        } catch (error) {
            console.error(ORDER_ITEM_ERROR_MESSAGES.NOT_FOUND, error);
            throw new Error(ORDER_ITEM_ERROR_MESSAGES.NOT_FOUND);
        }
    }

    async createOrderItem(
        orderId: number,
        request: CreateOrderItemRequest
    ): Promise<OrderItemDTO> {
        try {
            const response = await adminApi.post<OrderItemDTO>(
                ORDER_ITEM_API_ENDPOINTS.CREATE_ORDER_ITEM(orderId),
                request
            );
            return response.data;
        } catch (error) {
            console.error(ORDER_ITEM_ERROR_MESSAGES.CREATION, error);
            throw new Error(ORDER_ITEM_ERROR_MESSAGES.CREATION);
        }
    }

    async updateOrderItem(
        orderId: number,
        productId: number,
        request: UpdateOrderItemRequest
    ): Promise<OrderItemDTO> {
        try {
            const response = await adminApi.put<OrderItemDTO>(
                ORDER_ITEM_API_ENDPOINTS.UPDATE_ORDER_ITEM(orderId, productId),
                request
            );
            return response.data;
        } catch (error) {
            console.error(ORDER_ITEM_ERROR_MESSAGES.UPDATE, error);
            throw new Error(ORDER_ITEM_ERROR_MESSAGES.UPDATE);
        }
    }

    async deleteOrderItem(orderId: number, productId: number): Promise<void> {
        try {
            await adminApi.delete(
                ORDER_ITEM_API_ENDPOINTS.DELETE_ORDER_ITEM(orderId, productId)
            );
        } catch (error) {
            console.error(ORDER_ITEM_ERROR_MESSAGES.DELETION, error);
            throw new Error(ORDER_ITEM_ERROR_MESSAGES.DELETION);
        }
    }

    // Batch operations
    async bulkCreateOrderItems(
        orderId: number,
        items: CreateOrderItemRequest[]
    ): Promise<OrderItemDTO[]> {
        try {
            const response = await adminApi.post<OrderItemDTO[]>(
                ORDER_ITEM_API_ENDPOINTS.BULK_CREATE_ORDER_ITEMS(orderId),
                { items }
            );
            return response.data;
        } catch (error) {
            console.error(ORDER_ITEM_ERROR_MESSAGES.BULK_OPERATION_FAILED, error);
            throw new Error(ORDER_ITEM_ERROR_MESSAGES.BULK_OPERATION_FAILED);
        }
    }

    async bulkUpdateOrderItems(
        orderId: number,
        items: Array<{ productId: number; request: UpdateOrderItemRequest }>
    ): Promise<OrderItemDTO[]> {
        try {
            const response = await adminApi.put<OrderItemDTO[]>(
                ORDER_ITEM_API_ENDPOINTS.BULK_UPDATE_ORDER_ITEMS(orderId),
                { items }
            );
            return response.data;
        } catch (error) {
            console.error(ORDER_ITEM_ERROR_MESSAGES.BULK_OPERATION_FAILED, error);
            throw new Error(ORDER_ITEM_ERROR_MESSAGES.BULK_OPERATION_FAILED);
        }
    }

    // Statistics and analytics
    async getOrderItemStatistics(orderId: number): Promise<OrderItemStatistics> {
        try {
            const response = await adminApi.get<OrderItemStatistics>(
                ORDER_ITEM_API_ENDPOINTS.GET_ORDER_ITEM_STATISTICS(orderId)
            );
            return response.data;
        } catch (error) {
            console.error(ORDER_ITEM_ERROR_MESSAGES.GENERAL, error);
            throw new Error(ORDER_ITEM_ERROR_MESSAGES.GENERAL);
        }
    }

    async getTopSellingProducts(
        startDate: string,
        endDate: string,
        limit: number
    ): Promise<Array<{
        productId: number;
        productName: string;
        totalQuantity: number;
        totalAmount: number;
    }>> {
        try {
            const response = await adminApi.get(
                ORDER_ITEM_API_ENDPOINTS.GET_TOP_SELLING_PRODUCTS,
                {
                    params: {
                        startDate,
                        endDate,
                        limit
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error(ORDER_ITEM_ERROR_MESSAGES.GENERAL, error);
            throw new Error(ORDER_ITEM_ERROR_MESSAGES.GENERAL);
        }
    }
}

export const orderItemService = new OrderItemService();