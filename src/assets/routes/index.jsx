import { App } from "antd";
import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home";
import Products from "../../pages/Products";
import Dashboard from "../../Components/Dashboard";
import Shop from "../../pages/Shop";
import Customers from "../../pages/customers";
import Analytics from "../../pages/Analytics";
import Settings from "../../pages/Settings";

export const rooter = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/shop",
        Component: Shop,
      },
      {
        path: "/customers",
        Component: Customers,
      },
      {
        path: "/analytics",
        Component: Analytics,
      },
      {
        path: "/settings",
        Component: Settings,
      },
    ],
  },
]);
