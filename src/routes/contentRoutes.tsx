import type { RouteObject } from "react-router-dom";

import ContentLayout from "@Layout/ContentLayout";
import PaginaCarrinho from "@Pages/PaginaCarrinho/PaginaCarrinho";
import PaginaDoProduto, {
  paginaProdutoAction,
  reviewLoader,
} from "@Pages/PaginaDoProduto/PaginaDoProduto";
import PaginaRaiz from "@Pages/PaginaRaiz";

// ESPECIAIS
import ErrorPage from "@Pages/ErrorPage/ErrorPage";
import PageNotFound from "@Pages/PageNotFound/PageNotFound";

// LOADERS
import { loaderProdutoIndividual } from "@Products/loaders/loaderProdutoIndividual";
import { loaderProdutos } from "@Products/loaders/loaderProdutos";

export const contentRoutes: RouteObject = {
  path: "/v1",
  element: <ContentLayout />,
  errorElement: <ErrorPage />,
  children: [
    { index: true, element: <PaginaRaiz />, loader: loaderProdutos },
    { path: "*", element: <PageNotFound /> },
    {
      path: "comprar/:id",
      element: <PaginaDoProduto />,
      loader: async (args) => {
        const produto = await loaderProdutoIndividual(args);
        const reviews = await reviewLoader(args);

        return { produto, reviews };
      },
      action: paginaProdutoAction,
    },
    { path: "carrinho", element: <PaginaCarrinho /> },
  ],
};
