import Logo from "@UI/Logo";

import Styles from "./Footer.module.css";

import InstagramIcon from "@Assets/icons/instagram.png";

export default function Footer() {
  return (
    <footer className={Styles.Footer}>
      <div className={Styles.LogoContainer}>
        <span></span>
        <Logo />
        <span></span>
      </div>
      <p>Acompanhe-nos:</p>
      <div className={Styles.InstagramIcon}>
        <img src={InstagramIcon} />
      </div>
    </footer>
  );
}
