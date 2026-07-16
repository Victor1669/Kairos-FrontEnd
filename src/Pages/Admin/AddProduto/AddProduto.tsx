import {
  redirect,
  useNavigate,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router-dom";
import { Button } from "react-bootstrap";

import { addProdutoApi } from "@Products/ProdutoServices";

import ProdutoForm from "@UI/ProdutoForm/ProdutoForm";
import Carregamento from "@UI/Carregamento";

import Styles from "./AddProduto.module.css";

export default function AddProduto() {
  const navigateTo = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  if (isSubmitting) {
    return <Carregamento />;
  }

  return (
    <section className={Styles.AddProduto}>
      <header>
        <Button variant="outline-dark" onClick={() => navigateTo(-1)}>
          {"<-"}
        </Button>
        <h1>Novo produto</h1>
      </header>
      <ProdutoForm />
    </section>
  );
}

export async function createProductAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  await addProdutoApi(formData);

  return redirect("/v1/");
}
