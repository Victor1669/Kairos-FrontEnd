import { Link } from "react-router-dom";

import { useCartContext } from "@Cart/useCartContext";

import CarrinhoForm from "@UI/PaginaCarrinho/CarrinhoForm/CarrinhoForm";
import CarrinhoTable from "@UI/PaginaCarrinho/CarrinhoTable";

import Styles from "./PaginaCarrinho.module.css";

export default function PaginaCarrinho() {
  const { produtosNoCarrinho } = useCartContext();

  if (!produtosNoCarrinho.length) {
    return (
      <div className={Styles.NoProducts}>
        <h2>Sem produtos no seu carrinho!</h2>
        <Link className="default-button" to="/">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className={Styles.PaginaCarrinho}>
      <section className={Styles.TableSection}>
        <CarrinhoTable />
      </section>
      <section className={Styles.FormSection}>
        <CarrinhoForm />
      </section>
    </div>
  );
}
