import StarRating from "@UI/Stars/StarRating";
import RatingRow from "../RatingRow/RatingRow";

import Styles from "./DadosAvaliacao.module.css";

import type { ProdutoType } from "@Products/ProdutoType";

export default function DadosAvaliacao({ produto }: { produto: ProdutoType }) {
  return (
    <div className={Styles.DadosAvaliacao}>
      <h3>Avaliações</h3>
      <div className={Styles.StarRatingContainer}>
        <p>{4}</p>
        <StarRating locked defaultRating={4} size={40} />
        <p>({150} avaliações)</p>
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
