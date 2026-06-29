export interface AvaliacaoType {
  imagem_usuario: string;
  nome_usuario: string;
  comentario: string;
  avaliacao: number;
}

export interface FotosProdutoType {
  imagem: string;
}

type TamanhoProduto = "P" | "M" | "G" | "GG" | "XGG";

export interface ProdutoType {
  id: number;
  nome: string;
  descricao: string;
  cores: string[];
  precoIndividual: number;
  quantidade: number;
  totalAvaliacoes: number;
  avaliacaoMedia: number;
  imagens: FotosProdutoType[];
  tamanhos: TamanhoProduto[];
  avaliacoes: AvaliacaoType[];
}

export interface CarrinhoType {
  produtos: ProdutoType[];
  subtotal: number;
  frete: number;
  CEP: string;
}
