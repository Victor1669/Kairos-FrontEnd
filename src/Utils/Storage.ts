import { JWTStoreItem, StoreItem } from "./StorageItem";

import type { CartProductType } from "@Products/ProdutoType";

export const USER_TOKEN_KAIROS = new JWTStoreItem("USER_TOKEN_KAIROS");

export const CARRINHO_KAIROS = new StoreItem<CartProductType[]>(
  "CARRINHO_KAIROS",
);
