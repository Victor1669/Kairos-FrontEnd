import { Outlet } from "react-router-dom";

import { useRefreshToken } from "@Hooks/useRefreshToken";

import Logo from "@UI/Logo";
import Carregamento from "@UI/Carregamento";

import Styles from "./UserLayout.module.css";

export default function UserLayout() {
  const { isChecking } = useRefreshToken();

  return (
    <main className={Styles.UserLayout}>
      {isChecking ? <Carregamento /> : <Outlet />}
      <Logo className={Styles.Logo} />
    </main>
  );
}
