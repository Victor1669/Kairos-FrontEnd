import { useNavigate } from "react-router-dom";

import Styles from "./Produto.module.css";

import type { ProdutoType } from "@Products/ProdutoType";

export default function Produto({
  produto,
  className,
}: {
  produto: ProdutoType;
  className?: string;
}) {
  const { nome, price, id, image } = produto;

  const navigateTo = useNavigate();

  return (
    <div
      onClick={() => {
        navigateTo(`/v1/comprar/${id}`);
      }}
      className={`${Styles.Produto} ${className}`}
    >
      <img src={image} />
      <p>{nome}</p>
      <b>R$ {price}</b>
    </div>
  );
}
