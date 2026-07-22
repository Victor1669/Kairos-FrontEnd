import { Button } from "react-bootstrap";

import { createForm } from "@UI/Form/Form";

import Styles from "./EscreverAvaliacao.module.css";

import {
  ReviewFieldsValidation,
  type ReviewFields,
} from "@Review/ReviewFieldsValidation";

const { Form, RatingField, TextareaField, HiddenField } =
  createForm<ReviewFields>({
    validations: ReviewFieldsValidation,
  });

export default function EscreverAvaliacao() {
  return (
    <Form
      method="post"
      className={Styles.EscreverAvaliacao}
      options={{
        defaultValues: { intent: "post-review", description: "", stars: 0 },
      }}
    >
      <h4>Avalie você mesmo</h4>
      <HiddenField name="intent" />
      <RatingField name="stars" size={40} />
      <TextareaField
        name="description"
        placeHolder="Escreva sua avaliação..."
        rows={5}
      />

      <Button type="submit" variant="dark">
        Enviar
      </Button>
    </Form>
  );
}
