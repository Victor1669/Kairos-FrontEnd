import type { SubmitHandler } from "react-hook-form";

import { useCartContext } from "@Cart/useCartContext";

import { createForm } from "@UI/Form/Form";
const { Field, Form } = createForm<FieldValues>();

import { formatarParaDinheiro } from "@Utils/formatarParaDinheiro";

import Styles from "./CarrinhoForm.module.css";

import CaminhaoIcon from "@Assets/icons/caminhao.png";
import SacolaIcon from "@Assets/icons/sacola.png";
import InfoIcon from "@Assets/icons/info.png";
import { Button } from "react-bootstrap";

const FormOptions = { defaultValues: { cep: "" } };

type FieldValues = {
  cep: string;
};

export default function CarrinhoForm() {
  const { calcularValorTotal, produtosNoCarrinho } = useCartContext();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log({
      ...data,
      produtosNoCarrinho: produtosNoCarrinho.filter(
        (pnc) => pnc.quantidade !== 0,
      ),
    });
  };

  const valorTotal = calcularValorTotal();

  const frete = 10;

  function abrirWhatsapp() {
    const numero = "5511943192456";
    const mensagem =
      "Pabens voçe pazou\n\n" +
      `Produtos: \n${produtosNoCarrinho.map((pnc) => `Nome: ${pnc.nome}, Quantidade: ${pnc.quantidade}.\n`).join("")}`;

    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`);
  }

  return (
    <Form
      className={Styles.CarrinhoForm}
      onSubmit={handleSubmit}
      options={FormOptions}
    >
      <b>Resumo do produto: </b>

      <span>
        <b>Subtotal:</b>
        <p>{formatarParaDinheiro(valorTotal)}</p>
      </span>
      <span>
        <b>Frete:</b>
        <p>{formatarParaDinheiro(frete)}</p>
      </span>
      <hr />

      <span>
        <b>Total:</b>
        <p>{formatarParaDinheiro(valorTotal + frete)}</p>
      </span>
      <hr />

      <div className={Styles.FreteContainer}>
        <span id="1">
          <img src={CaminhaoIcon} />
          <p>Calcular frete</p>
        </span>
        <span>
          <Field placeHolder="Digite seu CEP" name="cep" type="text" />
          <Button
            variant="dark"
            className={`${Styles.FreteButton} btn btn-dark`}
          >
            Calcular
          </Button>
        </span>
      </div>

      <div className={Styles.ComoFunciona}>
        <span>
          <img src={InfoIcon} />
          <b>Como funciona?</b>
        </span>
        <b>Após o pagamento do sinal, iniciaremos a produção do seu pedido.</b>
        <a href="#">Saiba mais</a>
      </div>

      <Button
        variant="dark"
        type="submit"
        onClick={abrirWhatsapp}
        className="default-button"
      >
        <img src={SacolaIcon} />
        <b>Finalizar pedido</b>
      </Button>
    </Form>
  );
}
