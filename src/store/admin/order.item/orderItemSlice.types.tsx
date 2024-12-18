import {OrderItemDTO} from "../../../types/order.item.types.tsx";

// State Interface
export interface OrderItemState {
    orderItems: OrderItemDTO[];
    selectedOrderItem: OrderItemDTO | null;
    loading: boolean;
    error: string | null;
    totalQuantity: number;
    totalAmount: number;
    lastUpdated: string | null;
}

export const initialOrderItemState: OrderItemState = {
    orderItems: [],
    selectedOrderItem: null,
    loading: false,
    error: null,
    totalQuantity: 0,
    totalAmount: 0,
    lastUpdated: null
};