import { Star } from "@UI/Stars/StarRating";
import Styles from "./Avaliacao.module.css";

import type { AvaliacaoType } from "@Cart/CarrinhoType";

export default function Avaliacao({ avaliacao }: { avaliacao: AvaliacaoType }) {
  const {
    imagem_usuario,
    avaliacao: estrelas,
    nome_usuario,
    comentario,
  } = avaliacao;

  return (
    <div className={Styles.Avaliacao}>
      <div className={Styles.starContainer}>
        <b>{estrelas}</b>
        <Star full />
      </div>

      <div className={Styles.Usuario}>
        <span>
          {imagem_usuario.length ? <img src={imagem_usuario} /> : <></>}
        </span>

        <div style={{ display: "grid" }}>
          <b>{nome_usuario}</b>
          <p>{comentario}</p>
        </div>
      </div>
    </div>
  );
}
