import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import { useHeaderContext } from "../../Contexts/HeaderContext";

import Styles from "./Navbar.module.css";

import CartIcon from "@Assets/icons/cart.png";
import WhatsappIcon from "@Assets/icons/whatsapp.png";
import ProfileIcon from "@Assets/icons/profile.png";
import { useAuthContext } from "@Auth/useAuthContext";

export default function Navbar() {
  const { showMenu, menuRef } = useHeaderContext();
  const { logout } = useAuthContext();

  const navigateTo = useNavigate();

  function handleLogout() {
    logout();
    navigateTo("/user/login");
  }

  return (
    <nav ref={menuRef} className={Styles.Navbar} data-show-menu={showMenu}>
      <li>
        <Link to="/v1/carrinho">
          <img src={CartIcon} />
          <p>Meu carrinho</p>
        </Link>
      </li>
      <li>
        <Link to="">
          <img src={WhatsappIcon} />
          <p>Entre em contato</p>
        </Link>
      </li>
      <li>
        <Dropdown>
          <Dropdown.Toggle variant="" className={Styles.Toggle}>
            <img src={ProfileIcon} alt="" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#">Perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    </nav>
  );
}
