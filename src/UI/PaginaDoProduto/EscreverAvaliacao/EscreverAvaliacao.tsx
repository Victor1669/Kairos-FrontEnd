import { useState } from "react";

import StarRating from "@UI/Stars/StarRating";

import Styles from "./EscreverAvaliacao.module.css";

export default function EscreverAvaliacao() {
  const [stars, setStars] = useState(0);
  const [text, setText] = useState("");

  function handleSendRating(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(stars, text);
  }

  return (
    <form onSubmit={handleSendRating} className={Styles.EscreverAvaliacao}>
      <h4>Avalie você mesmo</h4>
      <StarRating size={40} onSetRating={setStars} />
      <textarea
        id="escreverAvaliacao"
        name="escreverAvaliacao"
        placeholder="Escreva sua avaliação..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
      />
      <button className="default-button">Enviar</button>
    </form>
  );
}
