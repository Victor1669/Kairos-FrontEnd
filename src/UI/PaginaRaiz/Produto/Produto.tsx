import { useNavigate } from "react-router-dom";

import Styles from "./Produto.module.css";

import type { ProdutoType } from "../../../Features/carrinho/CarrinhoType";

export default function Produto({
  produto,
  className,
}: {
  produto: ProdutoType;
  className?: string;
}) {
  const { nome, imagens, precoIndividual, id } = produto;

  const navigateTo = useNavigate();

  return (
    <div
      onClick={() => {
        navigateTo(`/comprar?id=${id}`);
      }}
      className={`${Styles.Produto} ${className}`}
    >
      <img src={imagens[0].imagem} />
      <p>{nome}</p>
      <b>R$ {precoIndividual},00</b>
    </div>
  );
}
