import type { LoaderFunctionArgs } from "react-router-dom";

import {
  produtoIndividualPorIdApi,
  produtoIndividualPorCodeApi,
} from "@Products/ProdutoServices";

export async function loaderProdutoIndividual({ params }: LoaderFunctionArgs) {
  const { id, code } = params;

  if (!id && !code) {
    throw new Response(JSON.stringify({ message: "ID ou código necessário" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { responseData, success } = id
    ? await produtoIndividualPorIdApi(Number(id))
    : await produtoIndividualPorCodeApi(code || "");

  if (!success) {
    throw new Response(
      JSON.stringify({ message: "Erro ao buscar produto: " + responseData }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return responseData;
}
