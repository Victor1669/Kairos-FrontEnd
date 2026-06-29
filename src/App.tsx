import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useCartContext } from "@Cart/useCartContext";

import { useSaveOnUnload } from "./Hooks/useSaveOnUnload";

import AppLayout from "./Layout/AppLayout";

import PaginaDoProduto from "./Pages/PaginaDoProduto/PaginaDoProduto";
import PaginaRaiz from "./Pages/PaginaRaiz";
import PaginaCarrinho from "./Pages/PaginaCarrinho/PaginaCarrinho";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <PaginaRaiz /> },
      { path: "/comprar", element: <PaginaDoProduto /> },
      { path: "/carrinho", element: <PaginaCarrinho /> },
    ],
  },
]);

export default function App() {
  const { produtosNoCarrinho } = useCartContext();

  useSaveOnUnload("CARRINHO", produtosNoCarrinho);

  return <RouterProvider router={router} />;
}
