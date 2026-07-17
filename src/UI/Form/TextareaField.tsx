import { Controller, useFormContext, useFormState } from "react-hook-form";
import type { CSSProperties } from "react";
import type { FieldValues, Path } from "react-hook-form";

import { useFieldValidation } from "./FormValidationContext";
import Styles from "./Form.module.css";

type TextareaFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label?: string;
  placeHolder?: string;
  className?: string;
  style?: CSSProperties;
  rows?: number;
  disabled?: boolean;
};

export default function TextareaField<
  T extends FieldValues,
  TName extends Path<T>,
>({
  name,
  label,
  placeHolder,
  className = "",
  style,
  rows = 4,
  disabled = false,
}: TextareaFieldProps<T, TName>) {
  const { control } = useFormContext<T>();
  const { errors } = useFormState<T>({ control, name });

  const errorMessage = errors[name]?.message as string | undefined;
  const rules = useFieldValidation<T, TName>(name);

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

          <div className={Styles.InputContainer}>
            <textarea
              id={name}
              name={name}
              ref={ref}
              rows={rows}
              placeholder={placeHolder}
              onBlur={onBlur}
              onChange={onChange}
              value={value ?? ""}
              disabled={disabled}
            />
          </div>

          <p className={Styles.Error}>{errorMessage}</p>
        </div>
      )}
    />
  );
}
