import type { RouteObject } from "react-router-dom";

import UserLayout from "@Layout/UserLayout/UserLayout";

import PaginaCadastro, {
  registerAction,
} from "@Pages/User/PaginaCadastro/PaginaCadastro";
import PaginaLogin, { loginAction } from "@Pages/User/PaginaLogin/PaginaLogin";
import PaginaEndereco, {
  registerAddressAction,
} from "@Pages/User/PaginaEndereco/PaginaEndereco";

// ESPECIAIS
import ErrorPage from "@Pages/ErrorPage/ErrorPage";

export const userRoutes: RouteObject = {
  path: "/user",
  element: <UserLayout />,
  errorElement: <ErrorPage />,
  children: [
    { path: "login", element: <PaginaLogin />, action: loginAction },
    { path: "signup", element: <PaginaCadastro />, action: registerAction },
    {
      path: "address",
      element: <PaginaEndereco />,
      action: registerAddressAction,
    },
  ],
};
