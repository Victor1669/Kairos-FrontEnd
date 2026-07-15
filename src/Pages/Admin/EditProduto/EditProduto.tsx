import {
  redirect,
  useLoaderData,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";
import { Button } from "react-bootstrap";

import { editProdutoApi } from "@Products/ProdutoServices";

import ProdutoForm from "@UI/ProdutoForm/ProdutoForm";

import Styles from "./EditProduto.module.css";

export default function EditProduto() {
  const produto = useLoaderData();

  const navigateTo = useNavigate();

  return (
    <div className={Styles.EditProduto}>
      <header>
        <Button variant="outline-dark" onClick={() => navigateTo(-1)}>
          {"<-"}
        </Button>
        <h1>Editar produto</h1>
      </header>
      <ProdutoForm defaultValues={produto} />
    </div>
  );
}

export async function editProdutoAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  await editProdutoApi(formData);

  return redirect("/v1/");
}
