import { createContext, useContext, useState } from "react";

import {
  adicionarItemAoCarrinhoStorage,
  removerItemDoCarrinhoStorage,
  pegarProdutosStorage,
  atualizarCarrinhoStorage,
} from "./carrinhoStorageHelper";

import type { AvaliacaoType, ProdutoType } from "./CarrinhoType";

interface CartContextValues {
  adicionarProdutoAoCarrinho(produto: ProdutoType): void;
  removerProdutoDoCarrinho(produto: ProdutoType): void;
  aumentarQtdItemIndividual(produto: ProdutoType): void;
  diminuirQtdItemIndividual(produto: ProdutoType): void;
  adicionarAvaliacaoAoProduto(id: number, avaliacao: AvaliacaoType): void;
  produtosNoCarrinho: ProdutoType[];
  calcularValorTotal: () => number;
  pegarProdutoPeloId: (id: number) => ProdutoType | undefined;
}

const CartContext = createContext<CartContextValues | undefined>(undefined);

function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [produtosNoCarrinho, setProdutosNoCarrinho] = useState<ProdutoType[]>(
    () => pegarProdutosStorage(),
  );

  function aumentarQtdItemIndividual(produto: ProdutoType) {
    setProdutosNoCarrinho((prev) =>
      prev.map((p) =>
        p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p,
      ),
    );
  }

  function diminuirQtdItemIndividual(produto: ProdutoType) {
    const qtdMinima = 1;

    setProdutosNoCarrinho((prev) =>
      prev.map((p) =>
        p.id === produto.id
          ? { ...p, quantidade: Math.max(qtdMinima, p.quantidade - 1) }
          : p,
      ),
    );
  }

  function adicionarProdutoAoCarrinho(produto: ProdutoType) {
    const produtoExistente = produtosNoCarrinho.find(
      (p) => p.id === produto.id,
    );

    if (produtoExistente) {
      aumentarQtdItemIndividual(produtoExistente);
    } else {
      adicionarItemAoCarrinhoStorage(produto);
      setProdutosNoCarrinho((ps) => [...ps, { ...produto, quantidade: 1 }]);
    }
  }

  function removerProdutoDoCarrinho(produto: ProdutoType) {
    removerItemDoCarrinhoStorage(produto);
    setProdutosNoCarrinho((ps) => ps.filter((p) => p.id !== produto.id));
  }

  function calcularValorTotal() {
    return produtosNoCarrinho.reduce(
      (prev, curr) => prev + curr.quantidade * curr.precoIndividual,
      0,
    );
  }

  function pegarProdutoPeloId(id: number) {
    return produtosNoCarrinho.find((p) => p.id === id);
  }

  function adicionarAvaliacaoAoProduto(id: number, avaliacao: AvaliacaoType) {
    setProdutosNoCarrinho((prev) => {
      const atualizados = prev.map((p) =>
        p.id === id ? { ...p, avaliacoes: [...p.avaliacoes, avaliacao] } : p,
      );
      atualizarCarrinhoStorage(atualizados);
      return atualizados;
    });
  }

  const value: CartContextValues = {
    adicionarProdutoAoCarrinho,
    removerProdutoDoCarrinho,
    aumentarQtdItemIndividual,
    diminuirQtdItemIndividual,
    adicionarAvaliacaoAoProduto,
    produtosNoCarrinho,
    calcularValorTotal,
    pegarProdutoPeloId,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCartContext() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("CartContext usado fora do CartContextProvider!");
  }

  return context;
}

export { CartContextProvider, useCartContext };
