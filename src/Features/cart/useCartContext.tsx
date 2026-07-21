import { createContext, useContext, useState } from "react";

import type { ProdutoType, CartProductType } from "@Products/ProdutoType";

interface CartContextValues {
  adicionarProdutoAoCarrinho(produto: ProdutoType): void;
  removerProdutoDoCarrinho(produto: ProdutoType): void;
  aumentarQtdItemIndividual(produtoId: number): number;
  diminuirQtdItemIndividual(produtoId: number): number;
  produtosNoCarrinho: CartProductType[];
  calcularValorTotal: () => number;
  pegarProdutoPeloId: (id: number) => CartProductType | undefined;
}

const CartContext = createContext<CartContextValues | undefined>(undefined);

function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [produtosNoCarrinho, setProdutosNoCarrinho] = useState<
    CartProductType[]
  >([]);

  function aumentarQtdItemIndividual(produtoId: number) {
    const qtdFinal = pegarProdutoPeloId(produtoId)?.quantidade || 0;

    setProdutosNoCarrinho((prev) =>
      prev.map((p) =>
        p.id === produtoId ? { ...p, quantidade: p.quantidade + 1 } : p,
      ),
    );

    return qtdFinal;
  }

  function diminuirQtdItemIndividual(produtoId: number) {
    const qtdFinal = pegarProdutoPeloId(produtoId)?.quantidade || 0;
    const qtdMinima = 1;

    setProdutosNoCarrinho((prev) =>
      prev.map((p) =>
        p.id === produtoId
          ? { ...p, quantidade: Math.max(qtdMinima, p.quantidade - 1) }
          : p,
      ),
    );

    return qtdFinal;
  }

  function adicionarProdutoAoCarrinho(produto: CartProductType) {
    const produtoExistente = produtosNoCarrinho.find(
      (p) => p.id === produto.id,
    );

    if (produtoExistente) {
      aumentarQtdItemIndividual(produtoExistente.id);
    } else {
      setProdutosNoCarrinho((ps) => [...ps, { ...produto, quantidade: 1 }]);
    }
  }

  function removerProdutoDoCarrinho(produto: CartProductType) {
    setProdutosNoCarrinho((ps) => ps.filter((p) => p.id !== produto.id));
  }

  function calcularValorTotal() {
    return produtosNoCarrinho.reduce(
      (prev, curr) => prev + curr.quantidade * +curr.price,
      0,
    );
  }

  function pegarProdutoPeloId(id: number) {
    return produtosNoCarrinho.find((p) => p.id === id);
  }

  const value: CartContextValues = {
    adicionarProdutoAoCarrinho,
    removerProdutoDoCarrinho,
    aumentarQtdItemIndividual,
    diminuirQtdItemIndividual,
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
