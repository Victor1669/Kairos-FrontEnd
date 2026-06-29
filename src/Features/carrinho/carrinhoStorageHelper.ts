import type { ProdutoType } from "./CarrinhoType";

const KEY_NAME = "CARRINHO";

function validarProdutos(produtos: any): ProdutoType[] {
  return Array.isArray(produtos) ? produtos : [];
}

function pegarProdutosStorage(): ProdutoType[] {
  const data = localStorage.getItem(KEY_NAME);

  try {
    const parsed = data ? JSON.parse(data) : [];
    return validarProdutos(parsed);
  } catch {
    return [];
  }
}

function apagarCarrinhoStorage() {
  localStorage.removeItem(KEY_NAME);
}

function atualizarCarrinhoStorage(produtos: ProdutoType[]) {
  localStorage.setItem(KEY_NAME, JSON.stringify(produtos));
}

function adicionarItemAoCarrinhoStorage(novoProduto: ProdutoType) {
  const produtos = pegarProdutosStorage();
  localStorage.setItem(KEY_NAME, JSON.stringify([...produtos, novoProduto]));
}

function removerItemDoCarrinhoStorage(produtoRemovido: ProdutoType) {
  const produtos = pegarProdutosStorage();
  localStorage.setItem(
    KEY_NAME,
    JSON.stringify(produtos.filter((p) => p.id !== produtoRemovido.id)),
  );
}

export {
  apagarCarrinhoStorage,
  adicionarItemAoCarrinhoStorage,
  atualizarCarrinhoStorage,
  removerItemDoCarrinhoStorage,
  pegarProdutosStorage,
};
