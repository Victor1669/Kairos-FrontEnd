import { useLoaderData } from "react-router-dom";

import type { ProdutoType } from "@Products/ProdutoType";
import EmblaCarousel from "@UI/Carousel/EmblaCarousel";

export default function ManutencaoProdutos() {
  const produtos: ProdutoType[] | string = useLoaderData();

  return (
    <div>
      <EmblaCarousel data={produtos} render={() => null} />
    </div>
  );
}
