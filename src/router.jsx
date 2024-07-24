import { createBrowserRouter } from "react-router-dom";
import Todo from "./TodoApp/todo.jsx";
import Login from "./screens/login.jsx";
import Register from "./screens/register.jsx";
import AuthLayout from "./layouts/authLayout.jsx";
import MainLayout from "./layouts/mainLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Todo />,
      },
      {
        path: "/contact",
        element: <h1>hello world</h1>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
