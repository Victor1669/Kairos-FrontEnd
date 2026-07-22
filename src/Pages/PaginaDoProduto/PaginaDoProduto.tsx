import { useEffect } from "react";
import { useLoaderData, type ActionFunctionArgs } from "react-router-dom";

import { postReviewApi, reviewsApi } from "@Review/ReviewServices";

import ImagensProduto from "@UI/PaginaDoProduto/ImagensProduto/ImagensProduto";
import DescricaoProduto from "@UI/PaginaDoProduto/DescricaoProduto/DescricaoProduto";
import Avaliacao from "@UI/PaginaDoProduto/Avaliacao/Avaliacao";
import EscreverAvaliacao from "@UI/PaginaDoProduto/EscreverAvaliacao/EscreverAvaliacao";
import DadosAvaliacao from "@UI/PaginaDoProduto/DadosAvaliacao/DadosAvaliacao";

import Styles from "./PaginaDoProduto.module.css";

import type { ReviewFields } from "@Review/ReviewFieldsValidation";
import type { ReviewType } from "@Review/ReviewType";
import type { ProdutoType } from "@Products/ProdutoType";

export default function PaginaDoProduto() {
  const { produto, reviews } = useLoaderData() as {
    produto: ProdutoType;
    reviews: ReviewType[];
  };

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
        <DadosAvaliacao reviews={reviews} />
        <EscreverAvaliacao />
      </section>

      <section className={Styles.SecaoAvaliacoes}>
        {reviews.map((a, index) => (
          <Avaliacao key={index} avaliacao={a} />
        ))}
      </section>
    </div>
  );
}

export async function paginaProdutoAction({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const { intent, ...dataObj } = Object.fromEntries(
    formData,
  ) as unknown as ReviewFields;
  const id = Number(params.id);

  if (intent === "add-to-cart") {
    console.log(dataObj);
  } else {
    await postReviewApi(id, dataObj);
  }

  return null;
}

export async function reviewLoader({ params }: ActionFunctionArgs) {
  const id = Number(params.id);
  const { responseData } = await reviewsApi(id);

  return responseData;
}
