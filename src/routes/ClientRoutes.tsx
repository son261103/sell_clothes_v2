import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from '../layouts/ClientLayout';
import HomePage from '../pages/client/HomePage';
// import PrivateRoute from "./PrivateRoute.tsx";


const ClientRoutes = () => {
    return (
        <Routes>
            <Route element={<ClientLayout />}>
                {/* Public routes */}
                <Route index element={<HomePage />} />

                {/* Protected client routes */}
                {/*<Route*/}
                {/*    path="cart"*/}
                {/*    element={*/}
                {/*        <PrivateRoute>*/}
                {/*            <CartPage />*/}
                {/*        </PrivateRoute>*/}
                {/*    }*/}
                {/*/>*/}
                {/*<Route*/}
                {/*    path="profile"*/}
                {/*    element={*/}
                {/*        <PrivateRoute>*/}
                {/*            <ProfilePage />*/}
                {/*        </PrivateRoute>*/}
                {/*    }*/}
                {/*/>*/}
                {/*<Route*/}
                {/*    path="orders"*/}
                {/*    element={*/}
                {/*        <PrivateRoute>*/}
                {/*            <OrderHistoryPage />*/}
                {/*        </PrivateRoute>*/}
                {/*    }*/}
                {/*/>*/}

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default ClientRoutes;