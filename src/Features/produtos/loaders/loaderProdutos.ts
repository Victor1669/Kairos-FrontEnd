import { produtosApi } from "@Products/ProdutoServices";

export async function loaderProdutos() {
  const res = await produtosApi();

  return res.responseData;
}
