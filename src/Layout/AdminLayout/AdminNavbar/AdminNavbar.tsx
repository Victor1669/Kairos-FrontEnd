import { Link } from "react-router-dom";

import { useAuthContext } from "@Auth/useAuthContext";
import { useSideMenuContext } from "../../../Contexts/SideMenuContext";

import Styles from "./AdminNavbar.module.css";

import TShirtIcon from "@Assets/icons/navbar/t-shirt.png";
import HomeIcon from "@Assets/icons/navbar/home.png";
import PedidosIcon from "@Assets/icons/navbar/pedidos.png";
import ClientesIcon from "@Assets/icons/cliente.png";
import LogoutIcon from "@Assets/icons/navbar/logout.png";

import { ProdutoIcon } from "@Assets/icons/navbar/ProdutoIcon";

export default function AdminNavbar() {
  const { showMenu, menuRef } = useSideMenuContext();
  const { logout } = useAuthContext();

  return (
    <nav ref={menuRef} className={Styles.AdminNavbar} data-show-menu={showMenu}>
      <div>
        <span>
          <img src={TShirtIcon} />
          <p>Admin</p>
        </span>
        <Link to="/admin/">
          <img src={HomeIcon} />
          <p>Home</p>
        </Link>
        <Link to="/admin/orders">
          <img src={PedidosIcon} />
          <p>Pedidos</p>
        </Link>
        <Link to="">
          <img src={ClientesIcon} />
          <p>Clientes</p>
        </Link>
        <Link to="/admin/products/">
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
