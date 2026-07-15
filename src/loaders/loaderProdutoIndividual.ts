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

  if (id && isNaN(Number(id))) {
    throw new Response(JSON.stringify({ message: "ID inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = id
    ? await produtoIndividualPorIdApi(Number(id))
    : await produtoIndividualPorCodeApi(code || "");

  return res.responseData;
}
