import { useRef } from "react";

import EmblaCarousel, {
  type EmblaCarouselRef,
} from "@UI/Carousel/EmblaCarousel";
import Miniatura from "@UI/Miniatura/Miniatura";

import Styles from "./ImagensProduto.module.css";

import type { FotosProdutoType } from "@Cart/CarrinhoType";

export default function ImagensProduto({
  imagens,
}: {
  imagens: FotosProdutoType[];
}) {
  const carouselRef = useRef<EmblaCarouselRef>(null);

  return (
    <section className={Styles.ImagensProduto}>
      <EmblaCarousel
        ref={carouselRef}
        className={Styles.Carrossel}
        data={imagens}
        render={(item, index) => <img key={index} src={item.imagem} />}
      />
      <div className={Styles.SmallImages}>
        <Miniatura
          onClick={() => carouselRef.current?.scrollTo(0)}
          src={imagens[0].imagem}
        />
        <Miniatura
          onClick={() => carouselRef.current?.scrollTo(1)}
          src={imagens[1].imagem}
        />
        <Miniatura
          onClick={() => carouselRef.current?.scrollTo(2)}
          src={imagens[2].imagem}
        />

        {imagens.length > 4 ? (
          <Miniatura onClick={() => {}} label={`+${imagens.length - 4}`} />
        ) : (
          <Miniatura
            onClick={() => carouselRef.current?.scrollTo(3)}
            src={imagens[3].imagem}
          />
        )}
      </div>
    </section>
  );
}
