import { useEffect } from "react";
import {
  Link,
  useActionData,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";
import { Button } from "react-bootstrap";

import {
  AddressFieldsValidation,
  type AddressFields,
} from "@Address/AddressValidation";

import { createForm } from "@UI/Form/Form";
import Logo from "@UI/Logo";

import Styles from "./PaginaEndereco.module.css";
import { registerAddressApi } from "@Address/AddressServices";

const { Field, Form } = createForm<AddressFields>({
  validations: AddressFieldsValidation,
});

export default function PaginaEndereco() {
  const actionData = useActionData() as {
    success?: boolean;
    message?: string;
    error?: string;
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success) {
      navigate("/v1/", { state: actionData.message });
    }
  }, [actionData, navigate]);

  return (
    <div className={Styles.PaginaEndereco}>
      <Logo type="transparent" />

      <span>
        <h1 style={{ marginBottom: 10 }}>Cadastro de endereço</h1>
        <p>Insira seu endereço para que as entregas funcionem</p>
      </span>

      <Form
        method="post"
        options={{ defaultValues: { cep: "", numero: 0, complemento: "" } }}
      >
        <Field label="CEP" placeHolder="Digite seu CEP" name="cep" />

        <Field
          label="N° da casa"
          type="number"
          placeHolder="Digite seu número"
          name="numero"
        />

        <Field
          label="Complemento"
          placeHolder="Digite seu complemento"
          name="complemento"
        />

        <Link to="/user/login">Registrar endereço depois</Link>
        <Button type="submit" variant="dark">
          Cadastrar endereço
        </Button>
      </Form>
    </div>
  );
}

export async function registerAddressAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dataObj: unknown = Object.fromEntries(formData);

  const { success, responseData } = await registerAddressApi(
    dataObj as AddressFields,
  );

  if (success) {
    return { success: true, message: responseData.message };
  } else {
    return { error: "Erro ao efetuar cadastro: " + responseData };
  }
}
