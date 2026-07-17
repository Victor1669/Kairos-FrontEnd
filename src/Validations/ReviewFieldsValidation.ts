import type { FormValidations } from "@UI/Form/FormValidationContext";

export interface ReviewFields {
  stars: number;
  description: string;
  intent: "post-review" | "add-to-cart";
}

export const ReviewFieldsValidation: FormValidations = {
  stars: {
    required: { value: true, message: "A avaliação é obrigatória" },
  },
  description: {
    required: { value: true, message: "O texto é obrigatório" },
  },
};
