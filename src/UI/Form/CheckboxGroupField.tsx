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

type CheckboxGroupFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label?: string;
  options: Option[];
  className?: string;
  style?: CSSProperties;
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
  disabled = false,
  layout = "vertical",
}: CheckboxGroupFieldProps<T, TName>) {
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
            {label && <label data-is-required={isRequired}>{label}</label>}

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

            <p className={Styles.Error}>{errorMessage}</p>
          </div>
        );
      }}
    />
  );
}
