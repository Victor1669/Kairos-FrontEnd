import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

import { useFieldValidation } from "./FormValidationContext";

type HiddenFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
};

export default function HiddenField<
  T extends FieldValues,
  TName extends Path<T>,
>({ name }: HiddenFieldProps<T, TName>) {
  const { control } = useFormContext<T>();
  const rules = useFieldValidation<T, TName>(name);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref } }) => (
        <input
          type="hidden"
          name={name}
          ref={ref}
          onChange={onChange}
          value={value ?? ""}
        />
      )}
    />
  );
}
