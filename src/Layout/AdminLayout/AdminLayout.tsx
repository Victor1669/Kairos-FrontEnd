import { Outlet } from "react-router-dom";

import { SideMenuContextProvider } from "@Contexts/SideMenuContext";
import { useAuthContext } from "@Auth/useAuthContext";
import { useRefreshToken } from "@Hooks/useRefreshToken";

import AdminNavbar from "./AdminNavbar/AdminNavbar";
import Carregamento from "@UI/Carregamento";

import Styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  useAuthContext(true);

  const { isChecking } = useRefreshToken();

  return (
    <SideMenuContextProvider>
      <main className={Styles.AdminLayout}>
        <AdminNavbar />
        {isChecking ? <Carregamento /> : <Outlet />}
      </main>
    </SideMenuContextProvider>
  );
}
