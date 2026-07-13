import { Button } from "react-bootstrap";
import {
  redirect,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";

import { addProdutoApi } from "@Products/ProdutoServices";

import { createForm } from "@UI/Form/Form";

import Styles from "./AddProduto.module.css";

import AddImageIcon from "@Assets/icons/admin/add-image.png";
import SaveIcon from "@Assets/icons/admin/save.png";

interface AddProdutoFormFields {
  nome: string;
  color: string[];
  description: string;
  size: string[];
  price: number;
  image: File;
}

const { Field, Form, FileField, CheckboxGroupField } =
  createForm<AddProdutoFormFields>();

export default function AddProduto() {
  const navigateTo = useNavigate();

  function goBack() {
    navigateTo(-1);
  }

  return (
    <section className={Styles.AddProduto}>
      <header>
        <Button variant="outline-dark" onClick={goBack}>
          {"<-"}
        </Button>
        <h1>Novo produto</h1>
      </header>
      <Form
        method="post"
        className={Styles.AddProdutoForm}
        options={{
          defaultValues: {
            nome: "",
            description: "",
            size: [],
            color: [],
            price: 0,
            image: undefined,
          },
        }}
      >
        <div>
          <Field name="nome" label="Nome do produto" />
          <Field name="description" label="Descrição" />
          <CheckboxGroupField
            name="size"
            label="Tamanhos Disponíveis"
            layout="horizontal"
            options={[
              { value: "P", label: "P" },
              { value: "M", label: "M" },
              { value: "G", label: "G" },
              { value: "GG", label: "GG" },
            ]}
          />
          <CheckboxGroupField
            name="color"
            label="Cores disponíveis"
            layout="horizontal"
            options={[
              { label: "Azul", value: "#00f" },
              { label: "Verde", value: "#0f0" },
            ]}
          />

          <Field type="number" name="price" label="Preço" />
        </div>
        <div className={Styles.ImageSection}>
          <FileField
            name="image"
            className={Styles.ImageField}
            imageContainerClassName={Styles.ImageContainer}
            placeholder={
              <label className={Styles.ImageInputPlaceholder} htmlFor="image">
                <img draggable="false" src={AddImageIcon} />
                <p>Upload de imagem</p>
                <p>Arraste e solte uma imagem aqui ou clique para selecionar</p>
              </label>
            }
            accept="image/jpeg,image/png,image/webp"
            maxSize={5}
          />
          <span className={Styles.ButtonArea}>
            <Button variant="outline-danger" onClick={goBack}>
              Cancelar
            </Button>
            <Button type="submit">
              <img
                draggable={false}
                style={{ marginRight: 15 }}
                src={SaveIcon}
              />
              Salvar produto
            </Button>
          </span>
        </div>
      </Form>
    </section>
  );
}

export async function createProductAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  await addProdutoApi(formData);

  return redirect("/v1/");
}
