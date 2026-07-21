import { useCartContext } from "@Cart/useCartContext";

import Table from "@UI/Table";
import ProdutoCarrinho from "./ProdutoCarrinho/ProdutoCarrinho";

export default function CarrinhoTable() {
  const { produtosNoCarrinho } = useCartContext();

  return (
    <Table
      data={produtosNoCarrinho}
      columns={["Produto", "Preço", "Quantidade", "Subtotal"]}
      render={(produto) => (
        <ProdutoCarrinho produto={produto} key={produto.id} />
      )}
    />
  );
}
