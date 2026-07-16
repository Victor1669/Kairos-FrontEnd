import { JWTStoreItem, StoreItem } from "./StorageItem";

import type { CartProductType } from "@Products/ProdutoType";

export const ACCESS_TOKEN_KAIROS = new JWTStoreItem("ACCESS_TOKEN_KAIROS");

export const REFRESH_TOKEN_KAIROS = new StoreItem("REFRESH_TOKEN_KAIROS");

export const CARRINHO_KAIROS = new StoreItem<CartProductType[]>(
  "CARRINHO_KAIROS",
);
