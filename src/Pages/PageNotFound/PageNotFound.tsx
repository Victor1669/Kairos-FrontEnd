import { Link } from "react-router-dom";

import Logo from "@UI/Logo";

import Styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={Styles.PageNotFound}>
      <Logo />
      <h1>Página não encontrada!</h1>
      <Link to="/" replace>
        Por favor, retorne ao nosso site
      </Link>
    </div>
  );
}
