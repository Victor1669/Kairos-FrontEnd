import Table from "@UI/Table";
import ProdutoAdmin from "../ProdutoAdmin/ProdutoAdmin";

import Styles from "./AdminProdutosTable.module.css";

import type { ProdutoImagemUnicaType } from "@Products/ProdutoType";

export default function AdminProdutosTable({
  produtos,
  open,
}: {
  produtos: ProdutoImagemUnicaType[];
  open(id: number): void;
}) {
  return (
    <Table
      className={Styles.AdminProdutosTable}
      data={produtos}
      columns={["Produto", "Preço", "Status", "Ações"]}
      render={(produto) => (
        <ProdutoAdmin key={produto.id} produto={produto} open={open} />
      )}
    />
  );
}
