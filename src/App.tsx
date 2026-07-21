import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useCartContext } from "@Cart/useCartContext";

// HOOKS
import { useSaveOnUnload } from "./Hooks/useSaveOnUnload";

// ROTAS
import { adminRoutes } from "@Routes/adminRoutes";
import { contentRoutes } from "@Routes/contentRoutes";

// LAYOUT
import UserLayout from "./Layout/UserLayout/UserLayout";

import PaginaCadastro, {
  registerAction,
} from "./Pages/User/PaginaCadastro/PaginaCadastro";
import PaginaLogin, { loginAction } from "@Pages/User/PaginaLogin/PaginaLogin";

// ESPECIAIS
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/v1" replace />,
    index: true,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <PaginaLogin />, action: loginAction },
      { path: "signup", element: <PaginaCadastro />, action: registerAction },
    ],
  },
  contentRoutes,
  adminRoutes,
]);

export default function App() {
  const { produtosNoCarrinho } = useCartContext();

  useSaveOnUnload("CARRINHO_KAIROS", produtosNoCarrinho);

  return <RouterProvider router={router} />;
}
