import type { ReviewType } from "@Review/ReviewType";

export type TamanhoProduto = "P" | "M" | "G" | "GG" | "XGG";

export interface FotosProdutoType {
  id: number;
  img_url: string;
  order: number;
}

export interface ProdutoType {
  id: number;
  nome: string;
  code: string;
  color: string[];
  size: TamanhoProduto[];
  images: FotosProdutoType[];
  price: string;
  description: string;
}

export interface ProdutoImagemUnicaType extends Omit<ProdutoType, "images"> {
  image: string;
}

export interface CartProductType extends ProdutoType {
  quantidade: number;
  totalAvaliacoes: number;
  avaliacaoMedia: number;
  avaliacoes: ReviewType[];
}
