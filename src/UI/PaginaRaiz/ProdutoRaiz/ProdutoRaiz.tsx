import { useNavigate } from "react-router-dom";

import Styles from "./ProdutoRaiz.module.css";

import type { ProdutoType } from "@Products/ProdutoType";

export interface ProdutoRaizType extends Omit<ProdutoType, "images"> {
  image: string;
}

export default function ProdutoRaiz({
  produto,
  className,
}: {
  produto: ProdutoRaizType;
  className?: string;
}) {
  const { nome, price, id, image } = produto;

  const navigateTo = useNavigate();

  return (
    <div
      onClick={() => {
        navigateTo(`/v1/comprar/${id}`);
      }}
      className={`${Styles.ProdutoRaiz} ${className}`}
    >
      <img src={image} />
      <p>{nome}</p>
      <b>R$ {price}</b>
    </div>
  );
}
