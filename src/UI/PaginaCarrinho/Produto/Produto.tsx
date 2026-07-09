import { Button } from "react-bootstrap";

import type { ProdutoType } from "../../../Features/carrinho/CarrinhoType";
import { useCartContext } from "../../../Features/carrinho/useCartContext";
import { formatarParaDinheiro } from "@Utils/formatarParaDinheiro";

import Styles from "./Produto.module.css";

export default function Produto({ produto }: { produto: ProdutoType }) {
  const { imagens, id, nome, quantidade, precoIndividual } = produto;

  const {
    aumentarQtdItemIndividual,
    diminuirQtdItemIndividual,
    removerProdutoDoCarrinho,
  } = useCartContext();

  return (
    <tr className={Styles.Produto} key={id}>
      <td className={Styles.ImagemNome}>
        <img src={imagens[0].imagem} alt={nome} />
        <p>{nome}</p>
      </td>

      <td className={Styles.PrecoProduto}>
        <span>Preço:</span>
        <p>{formatarParaDinheiro(precoIndividual)}</p>
      </td>

      <td className={Styles.CelulaQuantidade}>
        <span>Quantidade:</span>
        <div className={Styles.ContadorQuantidade}>
          <Button
            variant="dark"
            onClick={() => diminuirQtdItemIndividual(produto)}
          >
            -
          </Button>
          <p>{quantidade}</p>
          <Button
            variant="dark"
            onClick={() => aumentarQtdItemIndividual(produto)}
          >
            +
          </Button>
        </div>
      </td>

      <td className={Styles.PrecoTotal}>
        <span>Preço total:</span>
        <p>{formatarParaDinheiro(precoIndividual * quantidade)}</p>
      </td>

      <td className={Styles.BtnRemover}>
        <Button
          variant="danger"
          onClick={() => removerProdutoDoCarrinho(produto)}
        >
          Remover
        </Button>
      </td>
    </tr>
  );
}
