import { Link } from "react-router-dom";

import { useAuthContext } from "@Auth/useAuthContext";
import { useSideMenuContext } from "../../../Contexts/SideMenuContext";

import Styles from "./AdminLayoutNavbar.module.css";

import TShirtIcon from "@Assets/icons/navbar/t-shirt.png";
import HomeIcon from "@Assets/icons/navbar/home.png";
import PedidosIcon from "@Assets/icons/navbar/pedidos.png";
import ClientesIcon from "@Assets/icons/cliente.png";
import LogoutIcon from "@Assets/icons/navbar/logout.png";

import { ProdutoIcon } from "@Assets/icons/navbar/ProdutoIcon";

export default function AdminLayoutNavbar() {
  const { showMenu, menuRef } = useSideMenuContext();
  const { logout } = useAuthContext();

  return (
    <nav
      ref={menuRef}
      className={Styles.AdminLayoutNavbar}
      data-show-menu={showMenu}
    >
      <div>
        <span>
          <img src={TShirtIcon} />
          <p>Admin</p>
        </span>
        <Link to="/v1/">
          <img src={HomeIcon} />
          <p>Home</p>
        </Link>
        <Link to="">
          <img src={PedidosIcon} />
          <p>Pedidos</p>
        </Link>
        <Link to="">
          <img src={ClientesIcon} />
          <p>Clientes</p>
        </Link>
        <Link to="">
          <ProdutoIcon type="light" />
          <p>Produtos</p>
        </Link>
      </div>

      <Link className={Styles.Logout} to="/user/login" onClick={logout}>
        <img src={LogoutIcon} />
        <p>Sair</p>
      </Link>
    </nav>
  );
}
