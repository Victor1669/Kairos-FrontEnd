import { useState } from "react";
import { useLoaderData, type ActionFunctionArgs } from "react-router-dom";

import { deleteProdutoApi } from "@Products/ProdutoServices";

import AdminProdutosTable from "@UI/ManutencaoProdutos/AdminProdutosTable/AdminProdutosTable";
import DeleteProductDialog from "@UI/ManutencaoProdutos/DeleteProductDialog/DeleteProductDialog";

import Styles from "./ManutencaoProdutos.module.css";

import type { ProdutoImagemUnicaType } from "@Products/ProdutoType";
import { Button } from "react-bootstrap";

export default function ManutencaoProdutos() {
  const produtos: ProdutoImagemUnicaType[] | string = useLoaderData();

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [showDialog, setShowDialog] = useState(false);

  const close = () => {
    setShowDialog(false);
  };

  const open = (id: number) => {
    setSelectedProductId(id);
    setShowDialog(true);
  };

  if (typeof produtos !== "string")
    return (
      <section className={Styles.ManutencaoProdutos}>
        <header>
          <h1>Produtos</h1>
          <Button>+ Novo produto</Button>
        </header>
        <AdminProdutosTable produtos={produtos} open={open} />
        <DeleteProductDialog
          show={showDialog}
          close={close}
          selectedProductId={selectedProductId}
        />
      </section>
    );
}

export async function deleteProductAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const productId = formData.get("productId");

  if (!productId) {
    throw new Response(JSON.stringify({ message: "ID inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await deleteProdutoApi(+productId);

  return null;
}
