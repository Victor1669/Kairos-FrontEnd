import { FormProvider, useForm } from "react-hook-form";

import type { CSSProperties, ReactNode } from "react";
import type {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  Path,
} from "react-hook-form";

import Field, { type FormFieldProps } from "./Field";

interface FormInternalProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  options?: UseFormProps<T>;
  style?: CSSProperties;
  className?: string;
}

function FormInternal<T extends FieldValues>({
  children,
  onSubmit,
  options,
  style,
  className,
}: FormInternalProps<T>) {
  const methods = useForm<T>(options);
  return (
    <FormProvider {...methods}>
      <form
        className={className}
        style={style}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export const createForm = <T extends FieldValues>() => ({
  Field: (props: FormFieldProps<T, Path<T>>) => Field(props),
  Form: (props: FormInternalProps<T>) => FormInternal(props),
});
