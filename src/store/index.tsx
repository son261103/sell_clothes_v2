import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import logger from 'redux-logger';
import authReducer from './auth/authSlice';
import categoryReducer from './admin/category/category.slice';
import productReducer from './admin/product/product.slice';
import paymentMethodReducer from './admin/payment.method/payment.method.slice';
import orderReducer from './admin/order/order.slice';
import orderItemReducer from './admin/order.item/order.item.slice';

// Root state type
export interface RootState {
    auth: ReturnType<typeof authReducer>;
    category: ReturnType<typeof categoryReducer>;
    product: ReturnType<typeof productReducer>;
    order: ReturnType<typeof orderReducer>;
    orderItem: ReturnType<typeof orderItemReducer>;
    paymentMethod: ReturnType<typeof paymentMethodReducer>;
}

// Configure store
const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        order: orderReducer,
        orderItem: orderItemReducer,

        paymentMethod: paymentMethodReducer,
    },
    middleware: (getDefaultMiddleware) =>
        import.meta.env.DEV
            ? getDefaultMiddleware().concat(logger)
            : getDefaultMiddleware(),
    devTools: import.meta.env.DEV,
});

// Export store
export default store;

// Typed hooks
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;