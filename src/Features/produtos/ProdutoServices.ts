import { fetchApi } from "@Utils/fetchApi";

import type { ProdutoType } from "./ProdutoType";

interface ProdutosApiReturn {
  produtos: ProdutoType[];
}

export async function produtosApi() {
  return fetchApi<object, ProdutosApiReturn>({
    method: "get",
    route: "products",
  });
}

export async function produtoIndividualApi(productId: number) {
  return fetchApi<object, ProdutosApiReturn>({
    method: "get",
    route: `products/${productId}`,
  });
}

export async function addProdutosApi() {
  return fetchApi({
    method: "post",
    route: "products",
  });
}

export async function deleteProdutoApi(productId: number) {
  return fetchApi({
    method: "delete",
    route: `products/${productId}`,
  });
}
