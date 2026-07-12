import { Outlet } from "react-router-dom";

import { SideMenuContextProvider } from "@Contexts/SideMenuContext";

import AdminNavbar from "./AdminNavbar/AdminNavbar";

import Styles from "./AdminLayout.module.css";
import { useAuthContext } from "@Auth/useAuthContext";

export default function AdminLayout() {
  useAuthContext(true);
  return (
    <SideMenuContextProvider>
      <main className={Styles.AdminLayout}>
        <AdminNavbar />
        <Outlet />
      </main>
    </SideMenuContextProvider>
  );
}
