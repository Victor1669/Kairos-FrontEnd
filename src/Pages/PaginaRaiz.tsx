import { useEffect } from "react";

import { produtosApi } from "@Products/ProdutoServices";

import { useAuthContext } from "@Auth/useAuthContext";

import { USER_TOKEN_KAIROS } from "@Utils/Storage";

import Introducao from "@UI/PaginaRaiz/Introducao/Introducao";
import SobreNos from "@UI/PaginaRaiz/SobreNos/SobreNos";
import ProdutosRaiz from "@UI/PaginaRaiz/Carrossel/ProdutosRaiz";

import type { ContentUserType } from "@Auth/UserType";

interface TokenType extends ContentUserType {
  iat: string;
  exp: string;
}

export default function PaginaRaiz() {
  const { login, logout } = useAuthContext();

  useEffect(() => {
    USER_TOKEN_KAIROS.decode().then((token: unknown) => {
      try {
        const { iat, exp, ...user } = token as TokenType;

        if (Object.entries(user).length) {
          login(user);
        }
      } catch {
        logout();
      }
    });
  }, [login, logout]);

  return (
    <>
      <Introducao />
      <section>
        <ProdutosRaiz />
      </section>
      <SobreNos />
    </>
  );
}

export async function loader() {
  const res = await produtosApi();

  return res.responseData;
}
