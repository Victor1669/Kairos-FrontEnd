import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import { AuthContextProvider } from "@Auth/useAuthContext.tsx";
import { CartContextProvider } from "@Cart/useCartContext.tsx";

import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <CartContextProvider>
      <App />
      <ToastContainer
        draggable
        newestOnTop
        closeButton
        pauseOnHover
        position="top-center"
      />
    </CartContextProvider>
  </AuthContextProvider>,
);
