import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddExpense from "../Pages/AddExpense/AddExpense";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EditExpense from "../Pages/EditExpense/EditExpense";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Settings from "../Pages/Settings/Settings";
import Signup from "../Pages/SignUp/Signup";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Settings></Settings>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/Editexpense/:id",
        loader: async ({ params }) => {
          return fetch(`http://localhost:5000/mainexpense/${params.id}`);
        },
        element: (
          <PrivateRoute>
            <EditExpense></EditExpense>
          </PrivateRoute>
        ),
      },
      {
        path: "/Addexpense/:id",
        loader: async ({ params }) => {
          return fetch(`http://localhost:5000/expense/${params.id}`);
        },
        element: (
          <PrivateRoute>
            <AddExpense></AddExpense>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
