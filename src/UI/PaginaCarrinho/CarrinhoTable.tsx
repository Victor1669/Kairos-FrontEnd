import { useCartContext } from "../../Features/carrinho/useCartContext";

import Table from "@UI/Table";
import Produto from "./Produto/Produto";

export default function CarrinhoTable() {
  const { produtosNoCarrinho } = useCartContext();

  return (
    <Table
      data={produtosNoCarrinho}
      columns={["Produto", "Preço", "Quantidade", "Subtotal"]}
      render={(produto) => <Produto produto={produto} key={produto.id} />}
    />
  );
}
