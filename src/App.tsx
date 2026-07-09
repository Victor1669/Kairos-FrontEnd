import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useCartContext } from "@Cart/useCartContext";

import { useSaveOnUnload } from "./Hooks/useSaveOnUnload";

import ContentLayout from "./Layout/ContentLayout";
import UserLayout from "./Layout/UserLayout/UserLayout";

import PaginaDoProduto from "./Pages/PaginaDoProduto/PaginaDoProduto";
import PaginaRaiz from "./Pages/PaginaRaiz";
import PaginaCarrinho from "./Pages/PaginaCarrinho/PaginaCarrinho";

import PaginaLogin, {
  action as loginAction,
} from "./Pages/PaginaLogin/PaginaLogin";
import PaginaCadastro, {
  action as registerAction,
} from "./Pages/PaginaCadastro/PaginaCadastro";

import PageNotFound from "./Pages/PageNotFound/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/v1" replace />,
    index: true,
    errorElement: <PageNotFound />,
  },

  {
    path: "/v1",
    element: <ContentLayout />,
    children: [
      { index: true, element: <PaginaRaiz /> },
      { path: "comprar", element: <PaginaDoProduto /> },
      { path: "carrinho", element: <PaginaCarrinho /> },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      { path: "login", element: <PaginaLogin />, action: loginAction },
      { path: "signup", element: <PaginaCadastro />, action: registerAction },
    ],
  },
]);

export default function App() {
  const { produtosNoCarrinho } = useCartContext();

  useSaveOnUnload("CARRINHO", produtosNoCarrinho);

  return <RouterProvider router={router} />;
}
