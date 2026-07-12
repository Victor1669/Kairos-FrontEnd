import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function ContentLayout() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 10 }}>
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
