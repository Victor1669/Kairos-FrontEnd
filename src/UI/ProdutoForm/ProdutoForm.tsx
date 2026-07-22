import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { createForm } from "@UI/Form/Form";

import Styles from "./ProdutoForm.module.css";

import ImageIcon from "@Assets/icons/admin/add-image.png";
import SaveIcon from "@Assets/icons/admin/save.png";

import {
  ProductFieldsValidation,
  type ProductFields,
} from "@Products/ProductFieldsValidation";

interface DefaultValuesProp {
  defaultValues?: ProductFields;
}

const { Field, Form, ImageInput, CheckboxGroupField } =
  createForm<ProductFields>({ validations: ProductFieldsValidation });

export default function ProdutoForm({
  defaultValues = {
    color: [],
    description: "",
    image: null,
    nome: "",
    price: 0,
    size: [],
  },
}: DefaultValuesProp) {
  const navigateTo = useNavigate();

  const SIZE_OPTIONS = [
    { value: "P", label: "P" },
    { value: "M", label: "M" },
    { value: "G", label: "G" },
    { value: "GG", label: "GG" },
  ];

  const COLOR_OPTIONS = [
    { label: "Azul", value: "#00f" },
    { label: "Verde", value: "#0f0" },
  ];

  return (
    <Form
      method="post"
      className={Styles.ProdutoForm}
      options={{
        defaultValues,
      }}
    >
      <div>
        <Field name="nome" label="Nome do produto" />
        <Field name="description" label="Descrição" />
        <CheckboxGroupField
          name="size"
          label="Tamanhos Disponíveis"
          layout="horizontal"
          options={SIZE_OPTIONS}
        />
        <CheckboxGroupField
          name="color"
          label="Cores disponíveis"
          layout="horizontal"
          options={COLOR_OPTIONS}
        />

        <Field type="number" name="price" label="Preço" />
      </div>
      <div className={Styles.ImageSection}>
        <ProdutoImageField defaultValues={defaultValues} />
        <span className={Styles.ButtonArea}>
          <Button variant="outline-danger" onClick={() => navigateTo(-1)}>
            Cancelar
          </Button>
          <Button type="submit">
            <img draggable={false} style={{ marginRight: 15 }} src={SaveIcon} />
            Salvar produto
          </Button>
        </span>
      </div>
    </Form>
  );
}

function ProdutoImageField({ defaultValues }: DefaultValuesProp) {
  return (
    <ImageInput
      name="image"
      className={Styles.ImageField}
      imageContainerClassName={Styles.ImageContainer}
      initialUrl={defaultValues?.image as unknown as string}
      placeholder={
        <label className={Styles.ImageInputPlaceholder} htmlFor="image">
          <img draggable="false" src={ImageIcon} />
          <p>Upload de imagem</p>
          <p>Arraste e solte uma imagem aqui ou clique para selecionar</p>
        </label>
      }
      accept="image/jpeg,image/png,image/webp"
      maxSize={5}
    />
  );
}
