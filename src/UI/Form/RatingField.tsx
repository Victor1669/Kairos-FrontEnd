import { useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import type { CSSProperties } from "react";
import type { FieldValues, Path } from "react-hook-form";

import { useFieldValidation } from "./FormValidationContext";
import Styles from "./Form.module.css";

const starContainerStyle: CSSProperties = {
  display: "flex",
};

type RatingFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label?: string;
  className?: string;
  style?: CSSProperties;
  maxRating?: number;
  size?: number;
  disabled?: boolean;
};

export default function RatingField<
  T extends FieldValues,
  TName extends Path<T>,
>({
  name,
  label,
  className = "",
  style,
  maxRating = 5,
  size = 48,
  disabled = false,
}: RatingFieldProps<T, TName>) {
  const { control } = useFormContext<T>();
  const { errors } = useFormState<T>({ control, name });
  const [tempRating, setTempRating] = useState<number>(0);

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
        const rating = Number(value) || 0;

        const handleRate = (rateValue: number) => {
          if (disabled) return;
          onChange(rateValue);
        };

        const handleHoverIn = (rateValue: number) => {
          if (disabled) return;
          setTempRating(rateValue);
        };

        const handleHoverOut = () => {
          if (disabled) return;
          setTempRating(0);
        };

        return (
          <div
            className={`${Styles.FieldContainer} ${className}`}
            style={style}
          >
            {label && <label data-is-required={isRequired}>{label}</label>}

            <div style={starContainerStyle}>
              {Array.from({ length: maxRating }, (_, i) => (
                <Star
                  key={i}
                  full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                  onRate={() => handleRate(i + 1)}
                  onHoverIn={() => handleHoverIn(i + 1)}
                  onHoverOut={handleHoverOut}
                  size={size}
                  locked={disabled}
                />
              ))}
            </div>

            <p className={Styles.Error}>{errorMessage}</p>
          </div>
        );
      }}
    />
  );
}

interface StarProps {
  onRate?: () => void;
  full?: boolean;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  size?: number;
  locked?: boolean;
}

function Star({
  onRate,
  full,
  onHoverIn,
  onHoverOut,
  size = 24,
  locked,
}: StarProps) {
  const starStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: locked ? "initial" : "pointer",
  };

  return (
    <div
      style={starStyle}
      onClick={locked ? undefined : onRate}
      onMouseEnter={locked ? undefined : onHoverIn}
      onMouseLeave={locked ? undefined : onHoverOut}
    >
      {full ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 39 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4966 0L24.0991 14.5106H38.9932L26.9436 23.4787L31.5462 37.9894L19.4966 29.0213L7.44698 37.9894L12.0495 23.4787L-7.62939e-05 14.5106H14.894L19.4966 0Z"
            fill="#FFB743"
          />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 41 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4478 0L25.2748 15.8926H40.8955L28.2581 25.7148L33.0851 41.6074L20.4478 31.7852L7.81037 41.6074L12.6374 25.7148L3.8147e-05 15.8926H15.6207L20.4478 0Z"
            fill="#D9D9D9"
          />
        </svg>
      )}
    </div>
  );
}
