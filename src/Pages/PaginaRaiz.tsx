import type { EmblaOptionsType } from "embla-carousel";

import Introducao from "@UI/PaginaRaiz/Introducao/Introducao";
import SobreNos from "@UI/PaginaRaiz/SobreNos/SobreNos";
import EmblaCarousel from "@UI/Carousel/EmblaCarousel";
import Produto from "@UI/PaginaRaiz/Produto/Produto";

import { ProdutosMock } from "../Mock/ProdutosMock";

const OPTIONS: EmblaOptionsType = { dragFree: true };

export default function PaginaRaiz() {
  return (
    <>
      <Introducao />
      <EmblaCarousel
        data={ProdutosMock}
        render={(item) => {
          return (
            <li key={item.id}>
              <Produto className="embla__slide" produto={item} />
            </li>
          );
        }}
        options={OPTIONS}
      />
      <SobreNos />
    </>
  );
}
