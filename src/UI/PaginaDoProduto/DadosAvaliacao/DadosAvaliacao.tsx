import StarRating from "@UI/Stars/StarRating";
import RatingRow from "../RatingRow/RatingRow";

import Styles from "./DadosAvaliacao.module.css";

import type { ReviewType } from "@Review/ReviewType";

export default function DadosAvaliacao({ reviews }: { reviews: ReviewType[] }) {
  const totalAvaliacoes = reviews.length;

  const mediaAvaliacoes =
    Math.floor(
      reviews.reduce((prev, curr) => prev + curr.stars, 0) / totalAvaliacoes,
    ) || 0;

  return (
    <div className={Styles.DadosAvaliacao}>
      <h3>Avaliações</h3>
      <div className={Styles.StarRatingContainer}>
        <p>{mediaAvaliacoes} estrelas</p>
        <StarRating
          key={mediaAvaliacoes}
          locked
          defaultRating={mediaAvaliacoes}
          size={40}
        />
        <p>{totalAvaliacoes} avaliações</p>
      </div>

      {[5, 4, 3, 2, 1].map((num) => {
        const totalEspecifico = reviews.filter(
          (review) => review.stars === num,
        ).length;

        return (
          <RatingRow key={num} valor={totalEspecifico} maximo={totalAvaliacoes}>
            {num}
          </RatingRow>
        );
      })}
    </div>
  );
}
