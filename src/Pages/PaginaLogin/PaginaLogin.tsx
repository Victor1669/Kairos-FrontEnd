import { type ActionFunctionArgs, Link, redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

import { userLoginApi } from "@Auth/AuthServices";

import { JWTStoreItem } from "@Utils/StorageItem";

import { createForm } from "@UI/Form/Form";
import Logo from "@UI/Logo";

import Styles from "./PaginaLogin.module.css";

import EmailIcon from "@Assets/icons/email.png";
import LockIcon from "@Assets/icons/lock.png";

interface FormFields {
  email: string;
  password: string;
}

const { Field, Form } = createForm<FormFields>();

export default function PaginaLogin() {
  return (
    <div className={Styles.PaginaLogin}>
      <Logo type="transparent" />

      <span>
        <h1 style={{ marginBottom: 10 }}>Bem-vindo(a) de volta!</h1>
        <p>Entre com suas credenciais para acessar o sistema.</p>
      </span>

      <Form
        method="post"
        options={{ defaultValues: { email: "", password: "" } }}
      >
        <Field
          label="Email"
          type="email"
          placeHolder="Digite seu email"
          name="email"
          iconSrc={EmailIcon}
          validation="email"
        />

        <Field
          label="Senha"
          type="password"
          placeHolder="Digite sua senha"
          name="password"
          iconSrc={LockIcon}
          validation="password"
        />

        <Link to="/user/signup">Esqueceu sua senha?</Link>
        <Button type="submit" variant="dark">
          Entrar
        </Button>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dataObj: any = Object.fromEntries(formData);

  try {
    const {
      data: {
        message,
        data: { token, user },
      },
    } = await userLoginApi(dataObj);

    console.log(message, user);

    if (token.length) {
      const USER_TOKEN_KAIROS = new JWTStoreItem("USER_TOKEN_KAIROS");
      USER_TOKEN_KAIROS.set(token);
    }

    return redirect("/user/login");
  } catch (error) {
    return { error: "Erro ao realizar login: " + error };
  }
}
