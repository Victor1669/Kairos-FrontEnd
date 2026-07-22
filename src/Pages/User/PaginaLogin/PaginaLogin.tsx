import { type ActionFunctionArgs, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { userLoginApi } from "@Auth/AuthServices";

import { router } from "../../../App";
import { REFRESH_TOKEN_KAIROS, ACCESS_TOKEN_KAIROS } from "@Utils/Storage";

import {
  UserFieldsValidation,
  type UserFields,
} from "@Auth/UserFieldsValidation";

import { createForm } from "@UI/Form/Form";
import Logo from "@UI/Logo";

import Styles from "./PaginaLogin.module.css";

import EmailIcon from "@Assets/icons/forms/email.png";
import LockIcon from "@Assets/icons/lock.png";

type UserLoginFields = Omit<UserFields, "name" | "cpf" | "phone">;

const { Field, Form } = createForm<UserLoginFields>({
  validations: UserFieldsValidation,
});

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
        />

        <Field
          label="Senha"
          type="password"
          placeHolder="Digite sua senha"
          name="password"
          iconSrc={LockIcon}
        />

        <Link to="/user/signup">Esqueceu sua senha?</Link>
        <Button type="submit" variant="dark">
          Entrar
        </Button>
      </Form>
    </div>
  );
}

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dataObj: unknown = Object.fromEntries(formData);

  const { responseData, success } = await userLoginApi(dataObj as UserFields);

  if (success) {
    const { data } = responseData;

    if (data.token.length) {
      ACCESS_TOKEN_KAIROS.set(data.token);
    }
    if (data.refreshToken.length) {
      REFRESH_TOKEN_KAIROS.set(data.refreshToken);
    }

    return router.navigate("/v1", { replace: true });
  } else {
    return { error: "Erro ao realizar login: " + responseData };
  }
}
