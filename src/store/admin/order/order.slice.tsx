import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../../services/admin/order.service';
import {
    CreateOrderRequest,
    UpdateOrderRequest,
    OrderSearchParams,
    OrderStatistics
} from '../../../types/order.types';
import { initialState } from './orderSlice.types';

// Async Thunks
export const fetchOrders = createAsyncThunk(
    'order/fetchAll',
    async ({ page, size }: { page: number; size: number }, { rejectWithValue }) => {
        try {
            return await orderService.getAllOrders(page, size);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch orders');
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'order/fetchById',
    async (orderId: number, { rejectWithValue }) => {
        try {
            return await orderService.getOrderById(orderId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch order');
        }
    }
);

export const createOrder = createAsyncThunk(
    'order/create',
    async (request: CreateOrderRequest, { rejectWithValue }) => {
        try {
            return await orderService.createOrder(request);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to create order');
        }
    }
);

export const updateOrder = createAsyncThunk(
    'order/update',
    async ({ orderId, request }: { orderId: number; request: UpdateOrderRequest }, { rejectWithValue }) => {
        try {
            return await orderService.updateOrder(orderId, request);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update order');
        }
    }
);

export const deleteOrder = createAsyncThunk(
    'order/delete',
    async (orderId: number, { rejectWithValue }) => {
        try {
            await orderService.deleteOrder(orderId);
            return orderId;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete order');
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    'order/updateStatus',
    async ({ orderId, status }: { orderId: number; status: string }, { rejectWithValue }) => {
        try {
            return await orderService.updateOrderStatus(orderId, status);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update order status');
        }
    }
);

export const fetchOrdersByUser = createAsyncThunk(
    'order/fetchByUser',
    async ({ userId, page, size }: { userId: number; page: number; size: number }, { rejectWithValue }) => {
        try {
            return await orderService.getOrdersByUserId(userId, page, size);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user orders');
        }
    }
);

export const searchOrders = createAsyncThunk(
    'order/search',
    async ({
               params,
               page,
               size
           }: {
        params: OrderSearchParams;
        page: number;
        size: number
    }, { rejectWithValue }) => {
        try {
            return await orderService.searchOrders(params, page, size);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to search orders');
        }
    }
);

export const fetchOrderStatistics = createAsyncThunk(
    'order/statistics',
    async (_, { rejectWithValue }) => {
        try {
            return await orderService.getOrderStatistics();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch order statistics');
        }
    }
);

export const fetchTopOrders = createAsyncThunk(
    'order/fetchTop',
    async ({
               startDate,
               endDate,
               status,
               limit
           }: {
        startDate: string;
        endDate: string;
        status: string;
        limit: number;
    }, { rejectWithValue }) => {
        try {
            return await orderService.getTopOrdersByAmount(startDate, endDate, status, limit);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch top orders');
        }
    }
);

// Slice
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetOrder: () => initialState,
        clearSearchResults: (state) => {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        // Fetch all orders
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.content;
                state.totalOrders = action.payload.totalElements;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch order by ID
        builder
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create order
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
                state.totalOrders += 1;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update order
        builder
            .addCase(updateOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex(order => order.order_item_id === action.payload.order_item_id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
                if (state.selectedOrder?.order_item_id === action.payload.order_item_id) {
                    state.selectedOrder = action.payload;
                }
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete order
        builder
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order.order_item_id !== action.payload);
                if (state.selectedOrder?.order_item_id === action.payload) {
                    state.selectedOrder = null;
                }
                state.totalOrders -= 1;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update order status
        builder
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex(order => order.order_item_id === action.payload.order_item_id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
                if (state.selectedOrder?.order_item_id === action.payload.order_item_id) {
                    state.selectedOrder = action.payload;
                }
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch orders by user
        builder
            .addCase(fetchOrdersByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userOrders = action.payload.content;
            })
            .addCase(fetchOrdersByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Search orders
        builder
            .addCase(searchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload.content;
            })
            .addCase(searchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch order statistics
        builder
            .addCase(fetchOrderStatistics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderStatistics.fulfilled, (state, action) => {
                state.loading = false;
                const stats = action.payload as OrderStatistics;
                state.orderStatistics = {
                    daily: stats.daily || 0,
                    monthly: stats.monthly || 0,
                    total: stats.total || 0
                };
            })
            .addCase(fetchOrderStatistics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch top orders
        builder
            .addCase(fetchTopOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTopOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchTopOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearSelectedOrder, clearError, resetOrder, clearSearchResults } = orderSlice.actions;

export default orderSlice.reducer;