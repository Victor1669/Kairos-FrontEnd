import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useCartContext } from "@Cart/useCartContext";

import { useSaveOnUnload } from "./Hooks/useSaveOnUnload";

// LAYOUT
import ContentLayout from "./Layout/ContentLayout";
import UserLayout from "./Layout/UserLayout/UserLayout";
import AdminLayout from "./Layout/AdminLayout/AdminLayout";

// PÁGINAS NORMAIS
import PaginaCarrinho from "./Pages/PaginaCarrinho/PaginaCarrinho";
import PaginaRaiz from "./Pages/PaginaRaiz";
import PaginaDoProduto, {
  loaderProduto,
} from "./Pages/PaginaDoProduto/PaginaDoProduto";

import PaginaLogin, { loginAction } from "./Pages/PaginaLogin/PaginaLogin";
import PaginaCadastro, {
  registerAction,
} from "./Pages/PaginaCadastro/PaginaCadastro";

// ESPECIAIS
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

// LOADERS
import { loaderProdutos } from "./loaders/produtosLoader";

// ADMIN
import ManutencaoProdutos, {
  deleteProductAction,
} from "./Pages/Admin/ManutencaoProdutos/ManutencaoProdutos";
import ManutencaoPedidos from "./Pages/Admin/ManutencaoPedidos/ManutencaoPedidos";
import DashBoardAdmin from "./Pages/Admin/DashBoardAdmin/DashBoardAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/v1" replace />,
    index: true,
    errorElement: <ErrorPage />,
  },

  {
    path: "/v1",
    element: <ContentLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PaginaRaiz />, loader: loaderProdutos },
      { path: "*", element: <PageNotFound /> },
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
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <PaginaLogin />, action: loginAction },
      { path: "signup", element: <PaginaCadastro />, action: registerAction },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashBoardAdmin /> },
      {
        path: "orders",
        children: [
          {
            index: true,
            element: <ManutencaoPedidos />,
          },
          { path: ":id", element: <></> },
        ],
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ManutencaoProdutos />,
            loader: loaderProdutos,
            action: deleteProductAction,
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

  useSaveOnUnload("CARRINHO_KAIROS", produtosNoCarrinho);

  return <RouterProvider router={router} />;
}
