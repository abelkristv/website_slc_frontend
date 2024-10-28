import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login/LoginPage";
import Template from "../templates/Template";

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
  },
]);

export default router;
