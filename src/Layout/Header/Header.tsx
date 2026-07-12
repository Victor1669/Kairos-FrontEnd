import { useNavigate } from "react-router-dom";
import {
  SideMenuContextProvider,
  useSideMenuContext,
} from "../../Contexts/SideMenuContext";

import Navbar from "../Navbar/Navbar";

import Styles from "./Header.module.css";

import MenuHamburguerIcon from "@Assets/icons/navbar/menu-hamburguer.png";
import Logo from "@UI/Logo";

export default function Header() {
  const navigateTo = useNavigate();

  return (
    <SideMenuContextProvider>
      <header className={Styles.Header}>
        <Logo className={Styles.MainLogo} onClick={() => navigateTo("/")} />
        <MenuButton />
        <Navbar />
      </header>
    </SideMenuContextProvider>
  );
}

function MenuButton() {
  const { setShowMenu } = useSideMenuContext();

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
