import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import { useSideMenuContext } from "../../Contexts/SideMenuContext";
import { useAuthContext } from "@Auth/useAuthContext";

import Styles from "./Navbar.module.css";

import CartIcon from "@Assets/icons/cart.png";
import WhatsappIcon from "@Assets/icons/navbar/whatsapp.png";
import ProfileIcon from "@Assets/icons/navbar/profile.png";
import { ProdutoIcon } from "@Assets/icons/navbar/ProdutoIcon";

export default function Navbar() {
  const { showMenu, menuRef } = useSideMenuContext();
  const { logout, isAdmin } = useAuthContext();

  return (
    <nav ref={menuRef} className={Styles.Navbar} data-show-menu={showMenu}>
      <Link to="/v1/carrinho">
        <img src={CartIcon} />
        <p>Meu carrinho</p>
      </Link>

      <Link to="">
        <img src={WhatsappIcon} />
        <p>Entre em contato</p>
      </Link>

      {isAdmin && (
        <Link to="/v1/products">
          <ProdutoIcon type="dark" />

          <p>Produtos</p>
        </Link>
      )}
      <li>
        <Dropdown>
          <Dropdown.Toggle variant="" className={Styles.Toggle}>
            <img src={ProfileIcon} alt="" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#">Perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/user/login" onClick={logout}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    </nav>
  );
}
