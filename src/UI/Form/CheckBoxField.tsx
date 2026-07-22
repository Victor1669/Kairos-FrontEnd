import { Controller, useFormContext, useFormState } from "react-hook-form";
import type { CSSProperties, ReactNode } from "react";
import type { FieldValues, Path } from "react-hook-form";

import { useFieldValidation } from "./FormValidationContext";
import Styles from "./Form.module.css";

type CheckboxFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label: ReactNode;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
};

export default function CheckboxField<
  T extends FieldValues,
  TName extends Path<T>,
>({
  name,
  label,
  className = "",
  style,
  disabled = false,
}: CheckboxFieldProps<T, TName>) {
  const { control } = useFormContext<T>();
  const { errors } = useFormState<T>({ control, name });

  const errorMessage = errors[name]?.message as string | undefined;
  const rules = useFieldValidation<T, TName>(name);

  const isRequired =
    typeof rules?.required === "object" && rules.required !== null
      ? "value" in rules.required
        ? rules.required.value
        : false
      : !!rules?.required;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref } }) => (
        <div className={`${Styles.FieldContainer} ${className}`} style={style}>
          <label data-is-required={isRequired}>
            <input
              type="checkbox"
              ref={ref}
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              disabled={disabled}
            />
            <span>{label}</span>
          </label>

          <p className={Styles.Error}>{errorMessage}</p>
        </div>
      )}
    />
  );
}
