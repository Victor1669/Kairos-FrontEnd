import { Button } from "react-bootstrap";
import { Link, redirect, type ActionFunctionArgs } from "react-router-dom";

import Logo from "@UI/Logo";

import Styles from "./PaginaCadastro.module.css";

import { createForm } from "@UI/Form/Form";
import { registerUserApi } from "@Auth/AuthServices";

interface FormFields {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
}

const { Field, Form } = createForm<FormFields>();

export default function PaginaCadastro() {
  return (
    <div className={Styles.PaginaCadastro}>
      <Logo type="transparent" />

      <span>
        <h1 style={{ marginBottom: 10 }}>Cadastre-se</h1>
        <p>Cadastre-se para utilizar nossos servicos.</p>
      </span>

      <Form
        method="post"
        options={{
          defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            cpf: "",
          },
        }}
      >
        <Field
          label="Nome"
          type="text"
          placeHolder="Digite seu nome"
          name="name"
          validation="name"
        />

        <Field
          label="Email"
          type="email"
          placeHolder="Digite seu email"
          name="email"
          validation="email"
        />

        <Field
          label="Senha"
          type="password"
          placeHolder="Digite sua senha"
          name="password"
          validation="password"
        />

        <Field
          label="Telefone"
          type="tel"
          placeHolder="Digite seu telefone"
          name="phone"
          validation="phone"
        />

        <Field
          label="CPF"
          type="text"
          placeHolder="Digite seu CPF"
          name="cpf"
          validation="cpf"
        />

        <Link to="/user/login">Já possui uma conta?</Link>
        <Button type="submit" variant="dark">
          Cadastrar-se
        </Button>
      </Form>
    </div>
  );
}

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dataObj: unknown = Object.fromEntries(formData);

  const { responseData, success } = await registerUserApi(
    dataObj as FormFields,
  );

  if (success) {
    return redirect("/user/login");
  } else {
    return { error: "Erro ao efetuar cadastro: " + responseData };
  }
}
