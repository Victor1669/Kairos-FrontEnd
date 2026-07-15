import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import ImagensProduto from "@UI/PaginaDoProduto/ImagensProduto/ImagensProduto";
import DescricaoProduto from "@UI/PaginaDoProduto/DescricaoProduto/DescricaoProduto";
import Avaliacao from "@UI/PaginaDoProduto/Avaliacao/Avaliacao";
import EscreverAvaliacao from "@UI/PaginaDoProduto/EscreverAvaliacao/EscreverAvaliacao";
import DadosAvaliacao from "@UI/PaginaDoProduto/DadosAvaliacao/DadosAvaliacao";

import Styles from "./PaginaDoProduto.module.css";

/* TODO: adicionar tipagem e validação */

export default function PaginaDoProduto() {
  const produto = useLoaderData();

  useEffect(() => {
    document
      .getElementsByTagName("main")
      .item(0)
      ?.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  return (
    <div className={Styles.PaginaDoProduto}>
      <ImagensProduto imagens={produto.images} />

      <DescricaoProduto produto={produto} />

      <section className={Styles.SecaoEscreverAvaliacao}>
        <DadosAvaliacao produto={produto} />
        <EscreverAvaliacao />
      </section>

      <section className={Styles.SecaoAvaliacoes}>
        {[].map((a, index) => (
          <Avaliacao key={index} avaliacao={a} />
        ))}
      </section>
    </div>
  );
}
