import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import { OrderItemState } from './orderItemSlice.types';

// Base Selector
const selectOrderItemState = (state: RootState): OrderItemState => state.orderItem;

// Basic Selectors
export const selectAllOrderItems = createSelector(
    [selectOrderItemState],
    (orderItemState) => orderItemState.orderItems || []
);

export const selectSelectedOrderItem = createSelector(
    [selectOrderItemState],
    (orderItemState) => orderItemState.selectedOrderItem
);

export const selectOrderItemTotals = createSelector(
    [selectOrderItemState],
    (orderItemState) => ({
        totalQuantity: orderItemState.totalQuantity,
        totalAmount: orderItemState.totalAmount
    })
);

// Status Selectors
export const selectOrderItemLoading = createSelector(
    [selectOrderItemState],
    (orderItemState) => orderItemState.loading
);

export const selectOrderItemError = createSelector(
    [selectOrderItemState],
    (orderItemState) => orderItemState.error
);

// Specific Item Selectors
export const selectOrderItemsByOrderId = (orderId: number) =>
    createSelector(
        [selectAllOrderItems],
        (orderItems) => orderItems.filter((item) => item.orderId === orderId)
    );

export const selectOrderItemByIds = (orderId: number, productId: number) =>
    createSelector(
        [selectAllOrderItems],
        (orderItems) => orderItems.find(
            (item) => item.orderId === orderId && item.productId === productId
        )
    );

// Quantity and Amount Selectors
export const selectOrderItemQuantityByProduct = (productId: number) =>
    createSelector(
        [selectAllOrderItems],
        (orderItems) => orderItems
            .filter(item => item.productId === productId)
            .reduce((sum, item) => sum + item.quantity, 0)
    );

export const selectOrderItemAmountByProduct = (productId: number) =>
    createSelector(
        [selectAllOrderItems],
        (orderItems) => orderItems
            .filter(item => item.productId === productId)
            .reduce((sum, item) => sum + (item.price * item.quantity), 0)
    );

// Complex Selectors
export const selectOrderItemStats = createSelector(
    [selectAllOrderItems],
    (orderItems) => ({
        totalItems: orderItems.length,
        totalQuantity: orderItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        averagePrice: orderItems.length
            ? orderItems.reduce((sum, item) => sum + item.price, 0) / orderItems.length
            : 0,
        averageQuantity: orderItems.length
            ? orderItems.reduce((sum, item) => sum + item.quantity, 0) / orderItems.length
            : 0
    })
);

export const selectProductDistribution = createSelector(
    [selectAllOrderItems],
    (orderItems) => {
        const distribution: Record<number, { quantity: number; amount: number }> = {};
        orderItems.forEach(item => {
            if (!distribution[item.productId]) {
                distribution[item.productId] = { quantity: 0, amount: 0 };
            }
            distribution[item.productId].quantity += item.quantity;
            distribution[item.productId].amount += item.price * item.quantity;
        });
        return distribution;
    }
);

// Sorting Selectors
export const selectOrderItemsSortedByQuantity = createSelector(
    [selectAllOrderItems],
    (orderItems) => [...orderItems].sort((a, b) => b.quantity - a.quantity)
);

export const selectOrderItemsSortedByAmount = createSelector(
    [selectAllOrderItems],
    (orderItems) => [...orderItems].sort((a, b) =>
        (b.price * b.quantity) - (a.price * a.quantity)
    )
);

// Filter Selectors
export const selectOrderItemsByPriceRange = (minPrice: number, maxPrice: number) =>
    createSelector(
        [selectAllOrderItems],
        (orderItems) => orderItems.filter(
            item => item.price >= minPrice && item.price <= maxPrice
        )
    );

export const selectOrderItemsByQuantityRange = (minQuantity: number, maxQuantity: number) =>
    createSelector(
        [selectAllOrderItems],
        (orderItems) => orderItems.filter(
            item => item.quantity >= minQuantity && item.quantity <= maxQuantity
        )
    );

// Metadata Selectors
export const selectOrderItemMetadata = createSelector(
    [selectOrderItemState],
    (orderItemState) => ({
        lastUpdated: orderItemState.lastUpdated,
        totalQuantity: orderItemState.totalQuantity,
        totalAmount: orderItemState.totalAmount
    })
);

// Summary Selectors
export const selectOrderItemSummary = createSelector(
    [selectAllOrderItems, selectOrderItemMetadata],
    (orderItems, metadata) => ({
        items: orderItems.length,
        ...metadata,
        uniqueProducts: new Set(orderItems.map(item => item.productId)).size,
        averageOrderValue: metadata.totalAmount / orderItems.length || 0
    })
);

// Product Performance Selectors
export const selectTopProducts = (limit: number = 5) =>
    createSelector(
        [selectProductDistribution],
        (distribution) => Object.entries(distribution)
            .map(([productId, stats]) => ({
                productId: Number(productId),
                ...stats
            }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, limit)
    );