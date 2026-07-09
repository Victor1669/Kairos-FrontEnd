import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function ContentLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
