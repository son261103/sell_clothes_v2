import adminApi from "../../config/admin.api.config";
import {
    PAYMENT_METHOD_API_ENDPOINTS,
    PAYMENT_METHOD_ERROR_MESSAGE,
    PAYMENT_METHOD_CREATION_ERROR_MESSAGE,
    PAYMENT_METHOD_UPDATE_ERROR_MESSAGE,
    PAYMENT_METHOD_DELETION_ERROR_MESSAGE,
    PAYMENT_METHOD_SEARCH_ERROR_MESSAGE
} from "../../constants/payment.method.constant";
import {CreatePaymentMethodRequest, PaymentMethodsDTO, UpdatePaymentMethodRequest} from "../../types/payment.method.types.tsx";

class PaymentMethodService {
    async getAllPaymentMethods(): Promise<PaymentMethodsDTO[]> {
        try {
            const response = await adminApi.get<PaymentMethodsDTO[]>(PAYMENT_METHOD_API_ENDPOINTS.GET_ALL_PAYMENT_METHODS);
            return response.data;
        } catch (err) {
            console.error(PAYMENT_METHOD_ERROR_MESSAGE, err);
            throw new Error(PAYMENT_METHOD_ERROR_MESSAGE);
        }
    }

    async getPaymentMethodById(paymentMethodId: number): Promise<PaymentMethodsDTO> {
        try {
            const response = await adminApi.get<PaymentMethodsDTO>(PAYMENT_METHOD_API_ENDPOINTS.GET_PAYMENT_METHOD_BY_ID(paymentMethodId));
            return response.data;
        } catch (err) {
            console.error(PAYMENT_METHOD_ERROR_MESSAGE, err);
            throw new Error(PAYMENT_METHOD_ERROR_MESSAGE);
        }
    }

    async createPaymentMethod(request: CreatePaymentMethodRequest): Promise<PaymentMethodsDTO> {
        try {
            const response = await adminApi.post<PaymentMethodsDTO>(PAYMENT_METHOD_API_ENDPOINTS.CREATE_PAYMENT_METHOD, request);
            return response.data;
        } catch (err) {
            console.error(PAYMENT_METHOD_CREATION_ERROR_MESSAGE, err);
            throw new Error(PAYMENT_METHOD_CREATION_ERROR_MESSAGE);
        }
    }

    async updatePaymentMethod(paymentMethodId: number, request: UpdatePaymentMethodRequest): Promise<PaymentMethodsDTO> {
        try {
            const response = await adminApi.put<PaymentMethodsDTO>(PAYMENT_METHOD_API_ENDPOINTS.UPDATE_PAYMENT_METHOD(paymentMethodId), request);
            return response.data;
        } catch (err) {
            console.error(PAYMENT_METHOD_UPDATE_ERROR_MESSAGE, err);
            throw new Error(PAYMENT_METHOD_UPDATE_ERROR_MESSAGE);
        }
    }

    async deletePaymentMethod(paymentMethodId: number): Promise<void> {
        try {
            await adminApi.delete(PAYMENT_METHOD_API_ENDPOINTS.DELETE_PAYMENT_METHOD(paymentMethodId));
        } catch (err) {
            console.error(PAYMENT_METHOD_DELETION_ERROR_MESSAGE, err);
            throw new Error(PAYMENT_METHOD_DELETION_ERROR_MESSAGE);
        }
    }

    // If there's a specific search functionality for payment methods (e.g., by name, type, etc.):
    async searchPaymentMethods(keyword: string): Promise<PaymentMethodsDTO[]> {
        try {
            const response = await adminApi.get<PaymentMethodsDTO[]>(PAYMENT_METHOD_API_ENDPOINTS.SEARCH_PAYMENT_METHODS, {
                params: { keyword },
            });
            return response.data;
        } catch (err) {
            console.error(PAYMENT_METHOD_SEARCH_ERROR_MESSAGE, err);
            throw new Error(PAYMENT_METHOD_SEARCH_ERROR_MESSAGE);
        }
    }
}

export const paymentMethodService = new PaymentMethodService();
