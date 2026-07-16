import { Controller, useFormContext, useFormState } from "react-hook-form";
import { Form } from "react-bootstrap";
import type { CSSProperties } from "react";
import type { FieldValues, Path } from "react-hook-form";

import { useFieldValidation } from "./FormValidationContext";
import Styles from "./Form.module.css";

type Option = {
  value: string | number;
  label: string;
};

type SelectFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label?: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  validation?: string;
  disabled?: boolean;
};

export default function SelectField<
  T extends FieldValues,
  TName extends Path<T>,
>({
  name,
  label,
  options,
  placeholder = "Selecione...",
  className = "",
  style,
  validation,
  disabled = false,
}: SelectFieldProps<T, TName>) {
  const { control } = useFormContext<T>();
  const { errors } = useFormState<T>({ control, name });

  const errorMessage = errors[name]?.message as string | undefined;
  const rules = useFieldValidation<T, TName>(validation);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div className={`${Styles.FieldContainer} ${className}`} style={style}>
          {label && (
            <label style={{ textTransform: "capitalize" }} htmlFor={name}>
              {label}
            </label>
          )}

          <Form.Select
            id={name}
            ref={ref}
            value={value ?? ""}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          >
            <option value="" disabled>
              {placeholder}
            </option>

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>

          {errorMessage && <p className={Styles.Error}>{errorMessage}</p>}
        </div>
      )}
    />
  );
}
