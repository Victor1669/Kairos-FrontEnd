import { Controller, useFormContext, useFormState } from "react-hook-form";
import { Form } from "react-bootstrap";
import type { CSSProperties } from "react";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

import { FieldsValidation } from "./FieldsValidation";
import Styles from "./Form.module.css";

type Option = {
  value: string | number;
  label: string;
};

type CheckboxGroupFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label?: string;
  options: Option[];
  className?: string;
  style?: CSSProperties;
  validation?: keyof typeof FieldsValidation;
  disabled?: boolean;
  layout?: "vertical" | "horizontal";
};

export default function CheckboxGroupField<
  T extends FieldValues,
  TName extends Path<T>,
>({
  name,
  label,
  options,
  className = "",
  style,
  validation,
  disabled = false,
  layout = "vertical",
}: CheckboxGroupFieldProps<T, TName>) {
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
      render={({ field: { onChange, value } }) => {
        const selectedValues = Array.isArray(value)
          ? (value.map(String) as (string | number)[])
          : [];

        const handleChange = (
          optionValue: string | number,
          checked: boolean,
        ) => {
          const valueAsString = String(optionValue);
          const currentValues = selectedValues.map(String);

          let newValues: (string | number)[];

          if (checked) {
            newValues = [...new Set([...currentValues, valueAsString])];
          } else {
            newValues = currentValues.filter((v) => v !== valueAsString);
          }

          onChange(newValues);
        };

        return (
          <div
            className={`${Styles.FieldContainer} ${className}`}
            style={style}
          >
            {label && <label>{label}</label>}

            <div>
              {options.map((option) => {
                const isChecked = selectedValues.some(
                  (v) => String(v) === String(option.value),
                );

                return (
                  <Form.Check
                    key={option.value}
                    type="checkbox"
                    id={`${name}-${option.value}`}
                    label={option.label}
                    checked={isChecked}
                    onChange={(e) =>
                      handleChange(option.value, e.target.checked)
                    }
                    disabled={disabled}
                    inline={layout === "horizontal"}
                  />
                );
              })}
            </div>

            {errorMessage && <p className={Styles.Error}>{errorMessage}</p>}
          </div>
        );
      }}
    />
  );
}
