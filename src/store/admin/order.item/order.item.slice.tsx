import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderItemService } from '../../../services/admin/order.item.service';
import { CreateOrderItemRequest, UpdateOrderItemRequest } from '../../../types/order.item.types';
import { initialOrderItemState } from './orderItemSlice.types';

// Async Thunks
export const fetchOrderItems = createAsyncThunk(
    'orderItem/fetchByOrderId',
    async (orderId: number, { rejectWithValue }) => {
        try {
            return await orderItemService.getOrderItemsByOrderId(orderId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch order items');
        }
    }
);

export const fetchOrderItemByIds = createAsyncThunk(
    'orderItem/fetchByIds',
    async ({ orderId, productId }: { orderId: number; productId: number }, { rejectWithValue }) => {
        try {
            return await orderItemService.getOrderItemByOrderIdAndProductId(orderId, productId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch order item');
        }
    }
);

export const createOrderItem = createAsyncThunk(
    'orderItem/create',
    async ({ orderId, request }: { orderId: number; request: CreateOrderItemRequest }, { rejectWithValue }) => {
        try {
            return await orderItemService.createOrderItem(orderId, request);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to create order item');
        }
    }
);

export const updateOrderItem = createAsyncThunk(
    'orderItem/update',
    async (
        { orderId, productId, request }:
        { orderId: number; productId: number; request: UpdateOrderItemRequest },
        { rejectWithValue }
    ) => {
        try {
            return await orderItemService.updateOrderItem(orderId, productId, request);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update order item');
        }
    }
);

export const deleteOrderItem = createAsyncThunk(
    'orderItem/delete',
    async ({ orderId, productId }: { orderId: number; productId: number }, { rejectWithValue }) => {
        try {
            await orderItemService.deleteOrderItem(orderId, productId);
            return { orderId, productId };
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete order item');
        }
    }
);

export const bulkCreateOrderItems = createAsyncThunk(
    'orderItem/bulkCreate',
    async (
        { orderId, items }: { orderId: number; items: CreateOrderItemRequest[] },
        { rejectWithValue }
    ) => {
        try {
            return await orderItemService.bulkCreateOrderItems(orderId, items);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to bulk create order items');
        }
    }
);

export const bulkUpdateOrderItems = createAsyncThunk(
    'orderItem/bulkUpdate',
    async (
        { orderId, items }: {
            orderId: number;
            items: Array<{ productId: number; request: UpdateOrderItemRequest }>
        },
        { rejectWithValue }
    ) => {
        try {
            return await orderItemService.bulkUpdateOrderItems(orderId, items);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to bulk update order items');
        }
    }
);

// Slice
const orderItemSlice = createSlice({
    name: 'orderItem',
    initialState: initialOrderItemState,
    reducers: {
        clearSelectedOrderItem: (state) => {
            state.selectedOrderItem = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetOrderItems: () => initialOrderItemState,
        updateTotals: (state) => {
            state.totalQuantity = state.orderItems.reduce((sum, item) => sum + item.quantity, 0);
            state.totalAmount = state.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }
    },
    extraReducers: (builder) => {
        // Fetch order items
        builder
            .addCase(fetchOrderItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderItems.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItems = action.payload;
                state.totalQuantity = action.payload.reduce((sum, item) => sum + item.quantity, 0);
                state.totalAmount = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchOrderItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch single order item
        builder
            .addCase(fetchOrderItemByIds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderItemByIds.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrderItem = action.payload;
            })
            .addCase(fetchOrderItemByIds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create order item
        builder
            .addCase(createOrderItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrderItem.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItems.push(action.payload);
                state.totalQuantity += action.payload.quantity;
                state.totalAmount += action.payload.price * action.payload.quantity;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(createOrderItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update order item
        builder
            .addCase(updateOrderItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderItem.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orderItems.findIndex(
                    item => item.orderId === action.payload.orderId &&
                        item.productId === action.payload.productId
                );
                if (index !== -1) {
                    state.orderItems[index] = action.payload;
                }
                if (state.selectedOrderItem?.orderId === action.payload.orderId &&
                    state.selectedOrderItem?.productId === action.payload.productId) {
                    state.selectedOrderItem = action.payload;
                }
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(updateOrderItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete order item
        builder
            .addCase(deleteOrderItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrderItem.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItems = state.orderItems.filter(
                    item => !(item.orderId === action.payload.orderId &&
                        item.productId === action.payload.productId)
                );
                if (state.selectedOrderItem?.orderId === action.payload.orderId &&
                    state.selectedOrderItem?.productId === action.payload.productId) {
                    state.selectedOrderItem = null;
                }
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(deleteOrderItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Bulk create order items
        builder
            .addCase(bulkCreateOrderItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bulkCreateOrderItems.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItems.push(...action.payload);
                state.totalQuantity = state.orderItems.reduce((sum, item) => sum + item.quantity, 0);
                state.totalAmount = state.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(bulkCreateOrderItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Bulk update order items
        builder
            .addCase(bulkUpdateOrderItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bulkUpdateOrderItems.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.forEach(updatedItem => {
                    const index = state.orderItems.findIndex(
                        item => item.orderId === updatedItem.orderId &&
                            item.productId === updatedItem.productId
                    );
                    if (index !== -1) {
                        state.orderItems[index] = updatedItem;
                    }
                });
                state.totalQuantity = state.orderItems.reduce((sum, item) => sum + item.quantity, 0);
                state.totalAmount = state.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(bulkUpdateOrderItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    clearSelectedOrderItem,
    clearError,
    resetOrderItems,
    updateTotals
} = orderItemSlice.actions;

export default orderItemSlice.reducer;