import { Star } from "@UI/Stars/StarRating";

import Styles from "./Avaliacao.module.css";

import type { ReviewType } from "@Review/ReviewType";

export default function Avaliacao({ avaliacao }: { avaliacao: ReviewType }) {
  const { description, id, stars, user } = avaliacao;

  return (
    <div className={Styles.Avaliacao}>
      <div className={Styles.starContainer}>
        <b>{stars}</b>
        <Star full />
      </div>

      <div className={Styles.Usuario}>
        <span>{id}</span>

        <div style={{ display: "grid" }}>
          <b>{user}</b>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
