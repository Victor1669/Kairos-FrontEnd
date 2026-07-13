import { Controller, useFormContext, useFormState } from "react-hook-form";
import type { CSSProperties, ReactNode } from "react";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

import { FieldsValidation } from "./FieldsValidation";
import Styles from "./Form.module.css";

type CheckboxFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label: ReactNode;
  className?: string;
  style?: CSSProperties;
  validation?: keyof typeof FieldsValidation;
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
  validation,
  disabled = false,
}: CheckboxFieldProps<T, TName>) {
  const { control } = useFormContext<T>();
  const { errors } = useFormState<T>({ control, name });

  const errorMessage = errors[name]?.message as string | undefined;
  const rules = validation
    ? (FieldsValidation[validation] as RegisterOptions<T, TName>)
    : undefined;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref } }) => (
        <div className={`${Styles.FieldContainer} ${className}`} style={style}>
          <label>
            <input
              type="checkbox"
              ref={ref}
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              disabled={disabled}
            />
            <span>{label}</span>
          </label>

          {errorMessage && <p className={Styles.Error}>{errorMessage}</p>}
        </div>
      )}
    />
  );
}
