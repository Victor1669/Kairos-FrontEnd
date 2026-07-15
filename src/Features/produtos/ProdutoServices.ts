import { fetchApi } from "@Utils/fetchApi";
import { fetchApiUpload } from "@Utils/fetchApiUpload";

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

export async function produtoIndividualPorIdApi(productId: number) {
  return fetchApi<object, ProdutosApiReturn>({
    method: "get",
    route: `products/${productId}`,
  });
}

export async function produtoIndividualPorCodeApi(code: string) {
  return fetchApi<object, ProdutosApiReturn>({
    method: "get",
    route: `products/code/${code}`,
  });
}

export async function addProdutoApi(formData: FormData) {
  return fetchApiUpload({
    formData,
    route: "products",
  });
}

export async function editProdutoApi(formData: FormData) {
  const id = formData.get("id");

  return fetchApiUpload({
    formData,
    route: `products/${id}`,
    method: "put",
  });
}

export async function deleteProdutoApi(productId: number) {
  return fetchApi({
    method: "delete",
    route: `products/${productId}`,
  });
}
