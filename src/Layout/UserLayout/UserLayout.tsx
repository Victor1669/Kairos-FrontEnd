import { Outlet } from "react-router-dom";

import Styles from "./UserLayout.module.css";
import Logo from "@UI/Logo";

export default function UserLayout() {
  return (
    <main className={Styles.UserLayout}>
      <Outlet />

      <Logo />
    </main>
  );
}
