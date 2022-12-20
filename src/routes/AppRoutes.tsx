import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Default from "../config/layout/Default";
import CriarConta from "../pages/CriarConta";
import Login from "../pages/Login";
import PaginaRecados from "../pages/PaginaRecados";

const router = createBrowserRouter([
  {
    path: "/pagina-recados",
    element: <Default page={<PaginaRecados />} />,
  },
  {
    path: "/criar-conta",
    element: <Default page={<CriarConta />} />,
  },
  {
    path: "/",
    element: <Default page={<Login />} />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
