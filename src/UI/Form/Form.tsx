import { FormProvider, useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";

import type { CSSProperties, ReactNode } from "react";
import type {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  Path,
} from "react-hook-form";

import Field, { type FormFieldProps } from "./Field";

import Styles from "./Form.module.css";

interface FormInternalProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit?: SubmitHandler<T>;
  options?: UseFormProps<T>;
  style?: CSSProperties;
  className?: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
}

function FormInternal<T extends FieldValues>({
  children,
  onSubmit,
  options,
  style,
  className,
  method,
}: FormInternalProps<T>) {
  const methods = useForm<T>({
    ...options,
    reValidateMode: "onSubmit",
    mode: "onSubmit",
  });
  const submit = useSubmit();

  const handleValidSubmit: SubmitHandler<T> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (onSubmit) {
      onSubmit(data);
    }

    submit(formData, { method: method });
  };

  return (
    <FormProvider {...methods}>
      <form
        className={`${Styles.Form} ${className} `}
        style={style}
        onSubmit={methods.handleSubmit(handleValidSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export const createForm = <T extends FieldValues>() => ({
  Field: (props: FormFieldProps<T, Path<T>>) => <Field {...props} />,
  Form: (props: FormInternalProps<T>) => <FormInternal {...props} />,
});
