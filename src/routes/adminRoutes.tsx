import type { RouteObject } from "react-router-dom";

import AdminLayout from "@Layout/AdminLayout/AdminLayout";

import ErrorPage from "@Pages/ErrorPage/ErrorPage";

import { loaderProdutoIndividual } from "@Products/loaders/loaderProdutoIndividual";
import { loaderProdutos } from "@Products/loaders/loaderProdutos";

import AddProduto, {
  createProductAction,
} from "@Pages/Admin/AddProduto/AddProduto";
import DashBoardAdmin from "@Pages/Admin/DashBoardAdmin/DashBoardAdmin";
import EditProduto, {
  editProdutoAction,
} from "@Pages/Admin/EditProduto/EditProduto";
import ManutencaoPedidos from "@Pages/Admin/ManutencaoPedidos/ManutencaoPedidos";
import ManutencaoProdutos, {
  deleteProductAction,
} from "@Pages/Admin/ManutencaoProdutos/ManutencaoProdutos";

export const adminRoutes: RouteObject = {
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
        {
          path: "new",
          element: <AddProduto />,
          action: createProductAction,
        },
        {
          path: "edit/:code",
          element: <EditProduto />,
          loader: loaderProdutoIndividual,
          action: editProdutoAction,
        },
      ],
    },
  ],
};
