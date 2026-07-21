import type { ProdutoType } from "@Products/ProdutoType";

export interface CartType {
  produtos: ProdutoType[];
  subtotal: number;
  frete: number;
  CEP: string;
}
