import { Button } from "react-bootstrap";

import Styles from "./ProdutoAdmin.module.css";

import EditIcon from "@Assets/icons/admin/edit.png";
import TrashIcon from "@Assets/icons/admin/trash.png";

import type { ProdutoImagemUnicaType } from "@Products/ProdutoType";

export default function ProdutoAdmin({
  produto,
  open,
}: {
  produto: ProdutoImagemUnicaType;
  open(id: number): void;
}) {
  const { image, id, nome, price } = produto;

  return (
    <tr className={Styles.ProdutoAdmin} key={id}>
      <td>
        <span className={Styles.ImagemNome}>
          <img src={image} alt={nome} />
          <p>{nome}</p>
        </span>
      </td>

      <td className={Styles.PrecoProdutoAdmin}>
        <p>{+price}</p>
      </td>

      <td>
        <p>Status</p>
      </td>

      <td>
        <span className={Styles.Acoes}>
          <Button variant="outline-info" onClick={() => {}}>
            <img src={EditIcon} />
          </Button>
          <Button variant="outline-danger" onClick={() => open(id)}>
            <img src={TrashIcon} />
          </Button>
        </span>
      </td>
    </tr>
  );
}
