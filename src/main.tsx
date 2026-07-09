import { createRoot } from "react-dom/client";

import { CartContextProvider } from "@Cart/useCartContext.tsx";
import { AuthContextProvider } from "./Features/auth/useAuthContext.tsx";

import App from "./App.tsx";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </AuthContextProvider>,
);
