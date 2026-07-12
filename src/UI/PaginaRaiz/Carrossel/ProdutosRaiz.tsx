import type { EmblaOptionsType } from "embla-carousel";
import { useLoaderData } from "react-router-dom";

import EmblaCarousel from "@UI/Carousel/EmblaCarousel";
import Produto from "../Produto/Produto";

import type { ProdutoType } from "@Products/ProdutoType";

const OPTIONS: EmblaOptionsType = { dragFree: true };

export default function ProdutosRaiz() {
  const produtos: ProdutoType[] | string = useLoaderData();

  return (
    <>
      <h2 style={{ maxWidth: "85dvw", marginInline: "auto", marginTop: 40 }}>
        Todos os Produtos
      </h2>
      <EmblaCarousel
        style={{ marginBlock: 40 }}
        data={produtos}
        errorElement={<p>Erro</p>}
        render={(item) => {
          return (
            <li key={item.id}>
              <Produto className="embla__slide" produto={item} />
            </li>
          );
        }}
        options={OPTIONS}
      />
    </>
  );
}
