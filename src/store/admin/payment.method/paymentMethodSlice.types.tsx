// Payment Methods State Interface
import {PaymentMethodsDTO} from "../../../types/payment.method.types.tsx";

export interface PaymentMethodsState {
    // List of all payment methods
    paymentMethods: PaymentMethodsDTO[];

    // Currently selected payment method
    selectedPaymentMethod: PaymentMethodsDTO | null;

    // Loading and error states for the Payment Methods feature
    loading: boolean;
    error: string | null;

}

export const initialState: PaymentMethodsState = {
    paymentMethods: [],
    selectedPaymentMethod: null,
    loading: false,
    error: null,
};
