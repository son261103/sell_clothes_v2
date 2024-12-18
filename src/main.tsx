import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import './index.css'
import App from './App.tsx'
import store from "./store/index.tsx";

// Thêm error boundary để handle lỗi runtime
const root = document.getElementById('root')
if (!root) {
    throw new Error('Root element not found')
}

createRoot(root).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)