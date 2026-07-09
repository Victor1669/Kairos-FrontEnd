import { type ActionFunctionArgs, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { userLoginApi } from "@Auth/AuthServices";

import { router } from "../../App";
import { USER_TOKEN_KAIROS } from "@Utils/Storage";

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
  const dataObj: unknown = Object.fromEntries(formData);

  const { responseData, success } = await userLoginApi(dataObj as FormFields);

  if (success) {
    const { data } = responseData;

    if (data.token.length) {
      USER_TOKEN_KAIROS.set(data.token);
    }

    return router.navigate("/v1", { replace: true });
  } else {
    return { error: "Erro ao realizar login: " + responseData };
  }
}
