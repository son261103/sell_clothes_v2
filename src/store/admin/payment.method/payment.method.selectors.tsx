import { RootState } from "../../index.tsx";
import { PaymentMethodsState } from "./paymentMethodSlice.types.tsx";
import { createSelector } from "@reduxjs/toolkit";

// Base Selector
const selectPaymentMethodState = (state: RootState): PaymentMethodsState => state.paymentMethod;

// Basic Selectors
export const selectAllPaymentMethods = createSelector(
    [selectPaymentMethodState],
    (paymentMethodState) => paymentMethodState.paymentMethods
);

export const selectSelectedPaymentMethod = createSelector(
    [selectPaymentMethodState],
    (paymentMethodState) => paymentMethodState.selectedPaymentMethod
);

// Status Selectors
export const selectPaymentMethodLoading = createSelector(
    [selectPaymentMethodState],
    (paymentMethodState) => paymentMethodState.loading
);

export const selectPaymentMethodError = createSelector(
    [selectPaymentMethodState],
    (paymentMethodState) => paymentMethodState.error
);

// Complex/Combined Selectors
export const selectPaymentMethodStatus = createSelector(
    [selectPaymentMethodLoading, selectPaymentMethodError],
    (loading, error) => ({ loading, error })
);

export const selectPaymentMethodDetails = createSelector(
    [selectAllPaymentMethods, selectSelectedPaymentMethod],
    (paymentMethods, selectedPaymentMethod) => ({
        paymentMethods,
        selectedPaymentMethod,
        totalPaymentMethods: paymentMethods.length
    })
);

// Hierarchical/Custom Selectors
export const selectPaymentMethodHierarchy = createSelector(
    [selectAllPaymentMethods],
    (paymentMethods) => paymentMethods // You can add custom logic here if needed
);

// Stats Selectors
export const selectPaymentMethodStats = createSelector(
    [selectAllPaymentMethods],
    (paymentMethods) => ({
        totalPaymentMethods: paymentMethods.length,
    })
);
