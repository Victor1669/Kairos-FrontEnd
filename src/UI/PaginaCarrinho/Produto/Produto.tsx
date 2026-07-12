import { Button } from "react-bootstrap";

import { useCartContext } from "../../../Features/carrinho/useCartContext";
import { formatarParaDinheiro } from "@Utils/formatarParaDinheiro";

import Styles from "./Produto.module.css";

import type { CartProductType } from "@Products/ProdutoType";

export default function Produto({ produto }: { produto: CartProductType }) {
  const { images, id, nome, quantidade, price } = produto;

  const {
    aumentarQtdItemIndividual,
    diminuirQtdItemIndividual,
    removerProdutoDoCarrinho,
  } = useCartContext();

  return (
    <tr className={Styles.Produto} key={id}>
      <td className={Styles.ImagemNome}>
        <img src={images[0].img_url} alt={nome} />
        <p>{nome}</p>
      </td>

      <td className={Styles.PrecoProduto}>
        <span>Preço:</span>
        <p>{+price}</p>
      </td>

      <td className={Styles.CelulaQuantidade}>
        <span>Quantidade:</span>
        <div className={Styles.ContadorQuantidade}>
          <Button
            variant="dark"
            onClick={() => diminuirQtdItemIndividual(produto.id)}
          >
            -
          </Button>
          <p>{quantidade}</p>
          <Button
            variant="dark"
            onClick={() => aumentarQtdItemIndividual(produto.id)}
          >
            +
          </Button>
        </div>
      </td>

      <td className={Styles.PrecoTotal}>
        <span>Preço total:</span>
        <p>{+price}</p>
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
