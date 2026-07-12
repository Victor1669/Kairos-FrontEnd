import { useRef } from "react";

import EmblaCarousel, {
  type EmblaCarouselRef,
} from "@UI/Carousel/EmblaCarousel";
import Miniatura from "@UI/Miniatura/Miniatura";

import Styles from "./ImagensProduto.module.css";

import type { FotosProdutoType } from "@Products/ProdutoType";

export default function ImagensProduto({
  imagens,
}: {
  imagens: FotosProdutoType[] | undefined;
}) {
  const carouselRef = useRef<EmblaCarouselRef>(null);

  if (!imagens || imagens.length === 0) return null;

  return (
    <section className={Styles.ImagensProduto}>
      <EmblaCarousel
        ref={carouselRef}
        className={Styles.Carrossel}
        data={imagens}
        render={(item, index) => <img key={index} src={item.img_url} alt="" />}
      />
      <div className={Styles.SmallImages}>
        {/* Renderiza apenas até a 4ª miniatura ou o limite total */}
        {imagens.slice(0, 4).map((img, index) => (
          <Miniatura
            key={index}
            onClick={() => carouselRef.current?.scrollTo(index)}
            src={img.img_url}
          />
        ))}

        {/* Mostra o contador se houver mais que 4 */}
        {imagens.length > 4 && (
          <Miniatura onClick={() => {}} label={`+${imagens.length - 4}`} />
        )}
      </div>
    </section>
  );
}
