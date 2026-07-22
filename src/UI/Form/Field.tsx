import { useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";

import type { CSSProperties, HTMLInputTypeAttribute } from "react";
import type { FieldPathValue, FieldValues, Path } from "react-hook-form";

import { useFieldValidation } from "./FormValidationContext";

import Styles from "./Form.module.css";

export type FormFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label?: string;
  type?: HTMLInputTypeAttribute;
  style?: CSSProperties;
  className?: string;
  value?: FieldPathValue<T, TName>;
  placeHolder?: string;
  iconSrc?: string;
  hidePassword?: boolean;
};

export default function Field<T extends FieldValues, TName extends Path<T>>({
  name,
  label,
  type = "text",
  className = "",
  style,
  value,
  placeHolder,
  iconSrc,
  hidePassword,
}: FormFieldProps<T, TName>) {
  const { control } = useFormContext<T>();
  const { errors } = useFormState<T>({ control, name });

  const [showPassword, setShowPassword] = useState(!hidePassword);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const errorMessage = errors[name]?.message;

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
      render={({
        field: { onChange, onBlur, name: fieldName, ref, value: fieldValue },
      }) => (
        <div className={`${Styles.FieldContainer} ${className}`} style={style}>
          {type !== "hidden" && (
            <label
              data-is-required={isRequired}
              style={{ textTransform: "capitalize" }}
              htmlFor={name}
            >
              {label}
            </label>
          )}

          <div className={Styles.InputContainer}>
            {iconSrc && <img src={iconSrc} alt="field-icon" />}

            <input
              id={name}
              type={inputType}
              name={fieldName}
              ref={ref}
              placeholder={placeHolder}
              onBlur={onBlur}
              onChange={onChange}
              value={value !== undefined ? value : fieldValue}
            />

            {isPassword && hidePassword && (
              <img
                src={showPassword ? "/hide-icon.svg" : "/show-icon.svg"}
                alt="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          <p className={Styles.Error}>
            {errorMessage && errorMessage.toString()}
          </p>
        </div>
      )}
    />
  );
}
