// PaymentMethods DTO Interface
export interface PaymentMethodsDTO {
    paymentMethodId: number;
    methodName: string;
    createdAt: string;
    updatedAt: string;
}

// Create Payment Method Request Interface
export interface CreatePaymentMethodRequest {
    methodName: string;
}

// Update Payment Method Request Interface
export interface UpdatePaymentMethodRequest {
    methodName: string;
}

// State Interface
export interface PaymentMethodsState {
    paymentMethods: PaymentMethodsDTO[];
    selectedPaymentMethod: PaymentMethodsDTO | null;
    loading: boolean;
    error: string | null;
}

export const initialPaymentMethodsState: PaymentMethodsState = {
    paymentMethods: [],
    selectedPaymentMethod: null,
    loading: false,
    error: null,
};

// API Service Interface
export interface PaymentMethodsService {
    getAllPaymentMethods(): Promise<PaymentMethodsDTO[]>;
    getPaymentMethodById(id: number): Promise<PaymentMethodsDTO>;
    createPaymentMethod(request: CreatePaymentMethodRequest): Promise<PaymentMethodsDTO>;
    updatePaymentMethod(id: number, request: UpdatePaymentMethodRequest): Promise<PaymentMethodsDTO>;
    deletePaymentMethod(id: number): Promise<void>;
}
