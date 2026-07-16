import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type FormValidations = Record<
  string,
  RegisterOptions<FieldValues, string>
>;

const FormValidationContext = createContext<FormValidations>({});

type FormValidationProviderProps = {
  validations: FormValidations;
  children: ReactNode;
};

export function FormValidationProvider({
  validations,
  children,
}: FormValidationProviderProps) {
  return (
    <FormValidationContext.Provider value={validations}>
      {children}
    </FormValidationContext.Provider>
  );
}

export function useFieldValidation<
  T extends FieldValues,
  TName extends Path<T>,
>(name: TName): RegisterOptions<T, TName> | undefined {
  const validations = useContext(FormValidationContext);

  return validations[name] as unknown as RegisterOptions<T, TName> | undefined;
}
