import { useNavigate } from "react-router-dom";
import {
  HeaderContextProvider,
  useHeaderContext,
} from "../../Contexts/HeaderContext";

import Navbar from "../Navbar/Navbar";

import Styles from "./Header.module.css";

import MenuHamburguerIcon from "@Assets/icons/menu-hamburguer.png";
import Logo from "@UI/Logo";

export default function Header() {
  const navigateTo = useNavigate();

  return (
    <HeaderContextProvider>
      <header className={Styles.Header}>
        <Logo className={Styles.MainLogo} onClick={() => navigateTo("/")} />
        <MenuButton />
        <Navbar />
      </header>
    </HeaderContextProvider>
  );
}

function MenuButton() {
  const { setShowMenu } = useHeaderContext();

  function handleClick() {
    setShowMenu((s) => !s);
  }
  return (
    <img
      onClick={handleClick}
      className={Styles.MenuButton}
      src={MenuHamburguerIcon}
    />
  );
}
