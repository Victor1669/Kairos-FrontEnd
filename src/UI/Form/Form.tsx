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
import CheckboxField from "./CheckBoxField";
import ImageInput from "./ImageInput";
import SelectField from "./SelectField";
import CheckboxGroupField from "./CheckboxGroupField";

import Styles from "./Form.module.css";

interface FormInternalProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit?: SubmitHandler<T>;
  options?: UseFormProps<T>;
  style?: CSSProperties;
  className?: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
}

export type { FormFieldProps } from "./Field";

function FormInternal<T extends FieldValues>({
  children,
  onSubmit,
  options,
  style,
  className,
  method = "post",
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
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(key, item);
            } else {
              formData.append(key, item as string);
            }
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      }
    });

    if (onSubmit) {
      onSubmit(data);
    }

    submit(formData, { method, encType: "multipart/form-data" });
  };

  return (
    <FormProvider {...methods}>
      <form
        className={`${Styles.Form} ${className}`}
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

  CheckboxField: (
    props: React.ComponentProps<typeof CheckboxField<T, Path<T>>>,
  ) => <CheckboxField {...props} />,

  CheckboxGroupField: (
    props: React.ComponentProps<typeof CheckboxGroupField<T, Path<T>>>,
  ) => <CheckboxGroupField {...props} />,

  ImageInput: (props: React.ComponentProps<typeof ImageInput<T, Path<T>>>) => (
    <ImageInput {...props} />
  ),

  SelectField: (
    props: React.ComponentProps<typeof SelectField<T, Path<T>>>,
  ) => <SelectField {...props} />,

  Form: (props: FormInternalProps<T>) => <FormInternal {...props} />,
});
