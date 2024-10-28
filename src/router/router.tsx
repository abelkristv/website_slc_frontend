import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Template from "../templates/template";

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
