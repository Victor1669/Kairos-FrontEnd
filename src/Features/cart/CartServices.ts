import { fetchApi } from "@Utils/fetchApi";

import type { TamanhoProduto } from "@Products/ProdutoType";

export async function createCartApi() {
  return fetchApi({
    method: "post",
    route: `cart`,
  });
}

interface AddItemToCartApiBody {
  productId: number;
  color: string;
  size: TamanhoProduto;
  quantity: number;
}

export async function addItemToCartApi(body: AddItemToCartApiBody) {
  return fetchApi<AddItemToCartApiBody>({
    method: "post",
    route: `cart/items`,
    body,
  });
}
