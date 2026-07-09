import { Link } from "react-router-dom";

import { useHeaderContext } from "../../Contexts/HeaderContext";

import Styles from "./Navbar.module.css";

import CartIcon from "@Assets/icons/cart.png";
import WhatsappIcon from "@Assets/icons/whatsapp.png";
import ProfileIcon from "@Assets/icons/profile.png";

export default function Navbar() {
  const { showMenu, menuRef } = useHeaderContext();

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
        <Link to="/user/login">
          <img src={ProfileIcon} />
          <p>Perfil</p>
        </Link>
      </li>
    </nav>
  );
}
