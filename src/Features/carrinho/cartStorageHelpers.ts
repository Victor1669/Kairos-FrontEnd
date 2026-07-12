import { CARRINHO_KAIROS } from "@Utils/Storage";

import type { CartProductType } from "@Products/ProdutoType";

function validarProdutos(
  produtos: CartProductType[] | null,
): CartProductType[] {
  return Array.isArray(produtos) ? produtos : [];
}

async function pegarProdutosStorage(): Promise<CartProductType[]> {
  const produtos = await CARRINHO_KAIROS.get();
  return validarProdutos(produtos);
}

async function apagarCartStorage(): Promise<void> {
  await CARRINHO_KAIROS.delete();
}

async function atualizarCartStorage(
  produtos: CartProductType[],
): Promise<void> {
  await CARRINHO_KAIROS.set(produtos);
}

async function adicionarItemAoCartStorage(
  novoProduto: CartProductType,
): Promise<void> {
  const produtos = await pegarProdutosStorage();
  await CARRINHO_KAIROS.set([...produtos, novoProduto]);
}

async function removerItemDoCartStorage(
  produtoRemovido: CartProductType,
): Promise<void> {
  const produtos = await pegarProdutosStorage();
  await CARRINHO_KAIROS.set(
    produtos.filter((p) => p.id !== produtoRemovido.id),
  );
}

export {
  apagarCartStorage,
  adicionarItemAoCartStorage,
  atualizarCartStorage,
  removerItemDoCartStorage,
  pegarProdutosStorage,
};
