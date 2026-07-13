import type { EmblaOptionsType } from "embla-carousel";
import { useLoaderData } from "react-router-dom";

import EmblaCarousel from "@UI/Carousel/EmblaCarousel";
import ProdutoRaiz from "../ProdutoRaiz/ProdutoRaiz";

import Styles from "./CarrosselRaiz.module.css";

import type { ProdutoImagemUnicaType } from "@Products/ProdutoType";

const OPTIONS: EmblaOptionsType = { dragFree: true };

export default function CarrosselRaiz() {
  const produtos: ProdutoImagemUnicaType[] | string = useLoaderData();

  return (
    <section className={Styles.CarrosselRaiz}>
      <h2>Todos os Produtos</h2>
      <EmblaCarousel
        data={produtos}
        className={Styles.Carrossel}
        errorElement={<p>Erro</p>}
        render={(item) => {
          return (
            <li key={item.id}>
              <ProdutoRaiz className="embla__slide" produto={item} />
            </li>
          );
        }}
        options={OPTIONS}
      />
    </section>
  );
}
