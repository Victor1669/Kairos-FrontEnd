import { createRoot } from "react-dom/client";

import { CartContextProvider } from "@Cart/useCartContext.tsx";

import App from "./App.tsx";

import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <CartContextProvider>
    <App />
  </CartContextProvider>,
);
