import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login/LoginPage";
import Template from "../templates/Template";
import ErrorPage from "../page/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
