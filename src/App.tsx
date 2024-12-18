import AppRoutes from "./routes";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

    return (
        <BrowserRouter>
            <ToastContainer/>
            <AppRoutes/>
        </BrowserRouter>
    )
}

export default App
