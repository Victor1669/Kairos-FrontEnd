import { Outlet } from "react-router-dom";

import { useRefreshToken } from "@Hooks/useRefreshToken";

import Carregamento from "@UI/Carregamento";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function ContentLayout() {
  const { isChecking } = useRefreshToken();

  return (
    <>
      <Header />
      <main style={{ paddingTop: 10 }}>
        {isChecking ? <Carregamento /> : <Outlet />}
        <Footer />
      </main>
    </>
  );
}
