import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Collection from "../pages/collection/page";
import Product from "../pages/product/page";
import Ritual from "../pages/ritual/page";
import Contact from "../pages/contact/page";
import Checkout from "../pages/checkout/page";
import AuthPage from "../pages/auth/page";
import DashboardPage from "../pages/dashboard/page";
import AdminPage from "../pages/admin/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/collection",
    element: <Collection />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/ritual",
    element: <Ritual />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/orders",
    element: <Navigate to="/dashboard?tab=orders" replace />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
