import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    }
])

export default router;