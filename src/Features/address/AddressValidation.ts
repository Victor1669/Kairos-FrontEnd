import type { FormValidations } from "@UI/Form/FormValidationContext";

export interface AddressFields {
  cep: string;
  numero: number;
  complemento: string;
}

export const AddressFieldsValidation: FormValidations = {
  cep: {
    required: { value: true, message: "O CEP é obrigatório" },
  },
  numero: {
    required: { value: true, message: "O número da casa é obrigatório" },
    valueAsNumber: true,
  },
  complemento: {
    required: false,
  },
};
