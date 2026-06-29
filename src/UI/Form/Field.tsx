import { Controller, useFormContext } from "react-hook-form";

import type { CSSProperties, HTMLInputTypeAttribute } from "react";
import type { FieldPathValue, FieldValues, Path } from "react-hook-form";

export type FormFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label?: string;
  type?: HTMLInputTypeAttribute;
  style?: CSSProperties;
  className?: string;
  value?: FieldPathValue<T, TName>;
  placeHolder?: string;
};

export default function Field<T extends FieldValues, TName extends Path<T>>({
  name,
  label,
  type = "text",
  className,
  style,
  value,
  placeHolder,
}: FormFieldProps<T, TName>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const errorMessage = errors[name]?.message?.toString();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, name: fieldName, ref, value: fieldValue },
      }) => (
        <div className={className} style={style}>
          {type !== "hidden" && (
            <label style={{ textTransform: "capitalize" }} htmlFor={name}>
              {label}
            </label>
          )}
          <input
            id={name}
            type={type}
            name={fieldName}
            ref={ref}
            placeholder={placeHolder}
            onBlur={onBlur}
            onChange={(e) => {
              onChange(e);
            }}
            value={value !== undefined ? value : fieldValue}
          />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    />
  );
}
