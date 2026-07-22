import type { FormValidations } from "@UI/Form/FormValidationContext";

export interface ProductFields {
  nome: string;
  color: string[];
  description: string;
  size: string[];
  price: number;
  image: File | null;
}

export const ProductFieldsValidation: FormValidations = {
  nome: {
    required: {
      value: true,
      message: "O nome do produto é obrigatório",
    },
  },
  image: {
    required: {
      value: true,
      message: "A imagem do produto é obrigatório",
    },
  },
  color: {
    required: {
      value: true,
      message: "A cor do produto é obrigatória",
    },
  },
  description: {
    required: {
      value: true,
      message: "A descrição do produto é obrigatória",
    },
  },
  price: {
    required: {
      value: true,
      message: "O preço do produto é obrigatório",
    },
  },
  size: {
    required: {
      value: true,
      message: "O tamanho do produto é obrigatório",
    },
  },
};
