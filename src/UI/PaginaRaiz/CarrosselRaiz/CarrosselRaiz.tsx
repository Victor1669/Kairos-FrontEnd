import type { EmblaOptionsType } from "embla-carousel";
import { useLoaderData, useNavigation } from "react-router-dom";

import EmblaCarousel from "@UI/Carousel/EmblaCarousel";
import ProdutoRaiz from "../ProdutoRaiz/ProdutoRaiz";
import Carregamento from "@UI/Carregamento";

import Styles from "./CarrosselRaiz.module.css";

import NoProductsError from "@Assets/layout/no-products.webp";

import type { ProdutoImagemUnicaType } from "@Products/ProdutoType";

const OPTIONS: EmblaOptionsType = { dragFree: true };

export default function CarrosselRaiz() {
  const produtos: ProdutoImagemUnicaType[] | string = useLoaderData();

  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <section className={Styles.CarrosselRaiz}>
      {isLoading ? (
        <Carregamento />
      ) : (
        <>
          <h2>Todos os Produtos</h2>
          <EmblaCarousel
            data={produtos}
            className={Styles.Carrossel}
            errorElement={
              <div style={{ display: "grid", placeItems: "center", gap: 20 }}>
                <img src={NoProductsError} />
                <p>Estamos trabalhando nisso...</p>
              </div>
            }
            render={(item) => {
              return (
                <li key={item.id}>
                  <ProdutoRaiz className="embla__slide" produto={item} />
                </li>
              );
            }}
            options={OPTIONS}
          />
        </>
      )}
    </section>
  );
}
