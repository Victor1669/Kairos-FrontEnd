import { Form } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

import Styles from "./DeleteProductDialog.module.css";

import ImportantIcon from "@Assets/icons/admin/important.png";

interface PropType {
  show: boolean;
  close(): void;
  selectedProductId: number | null;
}

export default function DeleteProductDialog({
  show,
  close,
  selectedProductId,
}: PropType) {
  return (
    <Modal
      show={show}
      onHide={close}
      centered
      contentClassName={Styles.DeleteProductDialog}
    >
      <Form method="post" action="." onSubmit={close}>
        <img src={ImportantIcon} />
        <input type="hidden" name="productId" value={selectedProductId ?? ""} />
        <h3>Deseja realmente excluir este produto?</h3>
        <p>Essa acao nao pode ser desfeita.</p>
        <span>
          <Button onClick={close} variant="outline-dark">
            Cancelar
          </Button>
          <Button type="submit" variant="danger">
            Excluir
          </Button>
        </span>
      </Form>
    </Modal>
  );
}
