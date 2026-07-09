import { useEffect } from "react";
import type { EmblaOptionsType } from "embla-carousel";

import { useAuthContext } from "@Auth/useAuthContext";

import { USER_TOKEN_KAIROS } from "@Utils/Storage";

import Introducao from "@UI/PaginaRaiz/Introducao/Introducao";
import SobreNos from "@UI/PaginaRaiz/SobreNos/SobreNos";
import EmblaCarousel from "@UI/Carousel/EmblaCarousel";
import Produto from "@UI/PaginaRaiz/Produto/Produto";

import { ProdutosMock } from "../Mock/ProdutosMock";

import type { ContentUserType } from "@Auth/UserType";

const OPTIONS: EmblaOptionsType = { dragFree: true };

interface TokenType extends ContentUserType {
  iat: string;
  exp: string;
}

export default function PaginaRaiz() {
  const { login } = useAuthContext();

  useEffect(() => {
    USER_TOKEN_KAIROS.decode().then((token: unknown) => {
      const { iat, exp, ...user } = token as TokenType;

      if (Object.entries(user).length) {
        login(user);
      }
    });
  }, [login]);

  return (
    <>
      <Introducao />
      <EmblaCarousel
        data={ProdutosMock}
        render={(item) => {
          return (
            <li key={item.id}>
              <Produto className="embla__slide" produto={item} />
            </li>
          );
        }}
        options={OPTIONS}
      />
      <SobreNos />
    </>
  );
}
