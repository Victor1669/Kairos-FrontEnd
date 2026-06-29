import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useCartContext } from "../../Features/carrinho/useCartContext";

import ImagensProduto from "@UI/PaginaDoProduto/ImagensProduto/ImagensProduto";
import DescricaoProduto from "@UI/PaginaDoProduto/DescricaoProduto/DescricaoProduto";
import Avaliacao from "@UI/PaginaDoProduto/Avaliacao/Avaliacao";
import EscreverAvaliacao from "@UI/PaginaDoProduto/EscreverAvaliacao/EscreverAvaliacao";
import DadosAvaliacao from "@UI/PaginaDoProduto/DadosAvaliacao/DadosAvaliacao";

import Styles from "./PaginaDoProduto.module.css";

import { ProdutosMock } from "../../Mock/ProdutosMock";

export default function PaginaDoProduto() {
  const { pegarProdutoPeloId } = useCartContext();

  const [searchParams] = useSearchParams();

  const id = +searchParams.get("id")!;

  const produto = pegarProdutoPeloId(id) || ProdutosMock[id];
  const { avaliacoes, imagens } = produto;

  useEffect(() => {
    document
      .getElementsByTagName("main")
      .item(0)
      ?.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  return (
    <div className={Styles.PaginaDoProduto}>
      <ImagensProduto imagens={imagens} />

      <DescricaoProduto produto={produto} />

      <section className={Styles.SecaoEscreverAvaliacao}>
        <DadosAvaliacao produto={produto} />
        <EscreverAvaliacao />
      </section>

      <section className={Styles.SecaoAvaliacoes}>
        {avaliacoes.map((a, index) => (
          <Avaliacao key={index} avaliacao={a} />
        ))}
      </section>
    </div>
  );
}
