import type { RegisterOptions, FieldPath, FieldValues } from "react-hook-form";
import { isValidCPF } from "@Utils/isValidCPF";
import { isValidEmail } from "@Utils/isValidEmail";

interface FormFields {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
}

type ValidationRules<T extends FieldValues = FormFields> = {
  [K in FieldPath<T>]?: RegisterOptions<T, K>;
};

export const FieldsValidation: ValidationRules = {
  name: {
    required: {
      value: true,
      message: "O nome é obrigatório",
    },
    minLength: {
      value: 4,
      message: "O nome deve possuir no mínimo 4 caracteres",
    },
    maxLength: {
      value: 25,
      message: "O nome deve possuir no máximo 25 caracteres",
    },
  },
  email: {
    required: {
      value: true,
      message: "O email é obrigatório",
    },
    validate: {
      emailEstaValido: (valor: string) =>
        isValidEmail(valor) || "Email não segue o formato padrão!",
    },
  },
  password: {
    required: {
      value: true,
      message: "A senha é obrigatória",
    },
    minLength: {
      value: 8,
      message: "A senha deve ter no mínimo 8 caracteres",
    },
    validate: {
      possuiLetraMinusculaOuMaiuscula: (valor: string) =>
        /(?=.*[a-z])(?=.*[A-Z])/.test(valor) ||
        "A senha deve conter letras minúsculas e maiúsculas",
    },
  },
  phone: {
    required: {
      value: true,
      message: "O telefone é obrigatório",
    },
    minLength: {
      value: 9,
      message: "Telefone não segue o formato padrão!",
    },
  },
  cpf: {
    required: {
      value: true,
      message: "O CPF é obrigatório",
    },
    validate: {
      cpfEstaValido: (valor: string) => isValidCPF(valor) || "CPF inválido",
    },
  },
};
