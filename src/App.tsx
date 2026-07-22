import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// HOOKS
import { useCartContext } from "@Cart/useCartContext";
import { useSaveOnUnload } from "./Hooks/useSaveOnUnload";

// ROTAS
import { adminRoutes } from "@Routes/adminRoutes";
import { contentRoutes } from "@Routes/contentRoutes";
import { userRoutes } from "@Routes/userRoutes";

// ESPECIAIS
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/v1" replace />,
    index: true,
    errorElement: <ErrorPage />,
  },
  userRoutes,
  contentRoutes,
  adminRoutes,
]);

export default function App() {
  const { produtosNoCarrinho } = useCartContext();

  useSaveOnUnload("CARRINHO_KAIROS", produtosNoCarrinho);

  return <RouterProvider router={router} />;
}
