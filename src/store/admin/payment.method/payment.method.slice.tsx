import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentMethodService } from "../../../services/admin/payment.method.service.tsx";
import { CreatePaymentMethodRequest, PaymentMethodsDTO } from "../../../types/payment.method.types.tsx";
import { initialState } from "./paymentMethodSlice.types.tsx";

// Async Thunks
export const fetchPaymentMethods = createAsyncThunk<PaymentMethodsDTO[], void, { rejectValue: string }>(
    'paymentMethod/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await paymentMethodService.getAllPaymentMethods();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch payment methods');
        }
    }
);

export const fetchPaymentMethodById = createAsyncThunk<PaymentMethodsDTO, number, { rejectValue: string }>(
    'paymentMethod/fetchById',
    async (paymentMethodId: number, { rejectWithValue }) => {
        try {
            return await paymentMethodService.getPaymentMethodById(paymentMethodId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch payment method');
        }
    }
);

export const createPaymentMethod = createAsyncThunk<PaymentMethodsDTO, CreatePaymentMethodRequest, { rejectValue: string }>(
    'paymentMethod/create',
    async (request: CreatePaymentMethodRequest, { rejectWithValue }) => {
        try {
            return await paymentMethodService.createPaymentMethod(request);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to create payment method');
        }
    }
);

export const updatePaymentMethod = createAsyncThunk<PaymentMethodsDTO, { paymentMethodId: number; request: CreatePaymentMethodRequest }, { rejectValue: string }>(
    'paymentMethod/update',
    async ({ paymentMethodId, request }, { rejectWithValue }) => {
        try {
            return await paymentMethodService.updatePaymentMethod(paymentMethodId, request);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update payment method');
        }
    }
);

export const deletePaymentMethod = createAsyncThunk<number, number, { rejectValue: string }>(
    'paymentMethod/delete',
    async (paymentMethodId: number, { rejectWithValue }) => {
        try {
            await paymentMethodService.deletePaymentMethod(paymentMethodId);
            return paymentMethodId;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete payment method');
        }
    }
);

export const searchPaymentMethods = createAsyncThunk<PaymentMethodsDTO[], string, { rejectValue: string }>(
    'paymentMethod/search',
    async (keyword: string, { rejectWithValue }) => {
        try {
            return await paymentMethodService.searchPaymentMethods(keyword);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to search payment methods');
        }
    }
);

// Slice
const paymentMethodSlice = createSlice({
    name: 'paymentMethod',
    initialState,
    reducers: {
        clearSelectedPaymentMethod: (state) => {
            state.selectedPaymentMethod = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetPaymentMethod: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentMethods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.paymentMethods = action.payload;
                } else {
                    state.error = 'Invalid data format received from API';
                }
            })
            .addCase(fetchPaymentMethods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            .addCase(fetchPaymentMethodById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPaymentMethodById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPaymentMethod = action.payload;
            })
            .addCase(fetchPaymentMethodById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            .addCase(createPaymentMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPaymentMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentMethods.push(action.payload);
            })
            .addCase(createPaymentMethod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            .addCase(updatePaymentMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePaymentMethod.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPaymentMethod = action.payload;
                const index = state.paymentMethods.findIndex((pm) => pm.paymentMethodId === updatedPaymentMethod.paymentMethodId);
                if (index !== -1) {
                    state.paymentMethods[index] = updatedPaymentMethod;
                }
            })
            .addCase(updatePaymentMethod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            .addCase(deletePaymentMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePaymentMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentMethods = state.paymentMethods.filter((pm) => pm.paymentMethodId !== action.payload);
            })
            .addCase(deletePaymentMethod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            .addCase(searchPaymentMethods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchPaymentMethods.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentMethods = action.payload;
            })
            .addCase(searchPaymentMethods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

    }
});

export const { clearSelectedPaymentMethod, clearError, resetPaymentMethod } = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
