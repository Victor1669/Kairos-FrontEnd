import { Star } from "@UI/Stars/StarRating";

import Styles from "./RatingRow.module.css";

export default function RatingRow({
  valor,
  maximo,
  children,
}: {
  valor: number;
  maximo: number;
  children: string;
}) {
  const percentage = (valor / maximo) * 100;

  return (
    <div className={Styles.RatingRow}>
      <p>{children}</p>
      <Star full />
      <div className={Styles.progressBarBackground}>
        <div
          className={Styles.progressBarFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
