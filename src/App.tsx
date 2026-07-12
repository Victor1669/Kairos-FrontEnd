import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useCartContext } from "@Cart/useCartContext";

import { useSaveOnUnload } from "./Hooks/useSaveOnUnload";

import ContentLayout from "./Layout/ContentLayout";
import UserLayout from "./Layout/UserLayout/UserLayout";
import AdminLayout from "./Layout/AdminLayout/AdminLayout";

import PaginaCarrinho from "./Pages/PaginaCarrinho/PaginaCarrinho";
import PaginaRaiz, { loader as loaderProdutos } from "./Pages/PaginaRaiz";
import PaginaDoProduto, {
  loader as loaderProduto,
} from "./Pages/PaginaDoProduto/PaginaDoProduto";

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
    path: "v1",
    element: <ContentLayout />,
    children: [
      { index: true, element: <PaginaRaiz />, loader: loaderProdutos },
      {
        path: "comprar/:id",
        element: <PaginaDoProduto />,
        loader: loaderProduto,
      },
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
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "orders",
        children: [
          { path: "find", element: <></> },
          { path: ":id", element: <></> },
        ],
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <></>,
          },
          { path: "new", element: <></> },
          { path: "edit/:code", element: <></> },
        ],
      },
    ],
  },
]);

export default function App() {
  const { produtosNoCarrinho } = useCartContext();

  useSaveOnUnload("CARRINHO", produtosNoCarrinho);

  return <RouterProvider router={router} />;
}
