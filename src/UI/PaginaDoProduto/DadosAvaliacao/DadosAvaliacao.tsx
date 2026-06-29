import StarRating from "@UI/Stars/StarRating";
import RatingRow from "../RatingRow/RatingRow";

import Styles from "./DadosAvaliacao.module.css";

import type { ProdutoType } from "@Cart/CarrinhoType";

export default function DadosAvaliacao({ produto }: { produto: ProdutoType }) {
  const { avaliacaoMedia, totalAvaliacoes } = produto;

  return (
    <div className={Styles.DadosAvaliacao}>
      <h3>Avaliações</h3>
      <div className={Styles.StarRatingContainer}>
        <p>{avaliacaoMedia}</p>
        <StarRating locked defaultRating={avaliacaoMedia} size={40} />
        <p>({totalAvaliacoes} avaliações)</p>
      </div>
      <RatingRow valor={8} maximo={10}>
        5
      </RatingRow>
      <RatingRow valor={6} maximo={10}>
        4
      </RatingRow>
      <RatingRow valor={4} maximo={10}>
        3
      </RatingRow>
      <RatingRow valor={2} maximo={10}>
        2
      </RatingRow>
      <RatingRow valor={1} maximo={10}>
        1
      </RatingRow>
    </div>
  );
}
