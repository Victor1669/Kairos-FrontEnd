import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import type { CSSProperties, DragEvent, ChangeEvent } from "react";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

import { FieldsValidation } from "./FieldsValidation";
import Styles from "./Form.module.css";

type FileFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label?: string;
  accept?: string;
  className?: string;
  placeholder?: string | React.ReactNode;
  imageContainerClassName?: string;
  style?: CSSProperties;
  validation?: keyof typeof FieldsValidation;
  maxSize?: number;
};

function isFileTypeAccepted(file: File, accept: string): boolean {
  if (!accept || accept === "*") return true;

  const acceptedTypes = accept.split(",").map((type) => type.trim());

  return acceptedTypes.some((type) => {
    if (type.endsWith("/*")) {
      return file.type.startsWith(type.replace("/*", "/"));
    }
    return file.type === type;
  });
}

function isFileSizeValid(file: File, maxSizeMB: number): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}

export default function FileField<
  T extends FieldValues,
  TName extends Path<T>,
>({
  name,
  label,
  accept = "image/*",
  className = "",
  imageContainerClassName = "",
  placeholder,
  style,
  validation,
  maxSize = 5,
}: FileFieldProps<T, TName>) {
  const { control } = useFormContext<T>();
  const { errors } = useFormState<T>({ control, name });

  const [fileName, setFileName] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const errorMessage = errors[name]?.message as string | undefined;
  const rules = validation
    ? (FieldsValidation[validation] as RegisterOptions<T, TName>)
    : undefined;

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const clearFile = (onChange: (value: File | null) => void) => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFileName("");
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return "";
    });
    onChange(null);
  };

  const acceptFile = (file: File, onChange: (value: File) => void) => {
    setFileError("");
    setFileName(file.name);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
    onChange(file);
  };

  const handleFile = (
    file: File | undefined,
    onChange: (value: File | null) => void,
  ) => {
    if (!file) {
      setFileError("");
      clearFile(onChange);
      return;
    }

    if (!isFileTypeAccepted(file, accept)) {
      setFileError("Tipo de arquivo não permitido");
      clearFile(onChange);
      return;
    }

    if (!isFileSizeValid(file, maxSize)) {
      setFileError(`Arquivo muito grande. Máximo permitido: ${maxSize}MB`);
      clearFile(onChange);
      return;
    }

    acceptFile(file, onChange);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void,
  ) => {
    handleFile(e.target.files?.[0], onChange);
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    onChange: (value: File | null) => void,
  ) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file && inputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      inputRef.current.files = dataTransfer.files;
    }

    handleFile(file, onChange);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, ref } }) => (
        <div className={`${Styles.FieldContainer} ${className}`} style={style}>
          {label && <label htmlFor={name}>{label}</label>}

          <div
            className={`${imageContainerClassName}`}
            data-is-image-hovering={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, onChange)}
            onClick={() => inputRef.current?.click()}
          >
            <input
              id={name}
              name={name}
              type="file"
              ref={(el) => {
                inputRef.current = el;
                ref(el);
              }}
              accept={accept}
              onChange={(e) => handleInputChange(e, onChange)}
            />
            {previewUrl && <img src={previewUrl} alt={fileName} />}

            {fileName ? (
              <p>{fileName}</p>
            ) : (
              placeholder || <p>Arraste uma imagem ou clique para selecionar</p>
            )}
          </div>

          {fileError && <p className={Styles.Error}>{fileError}</p>}
          {errorMessage && <p className={Styles.Error}>{errorMessage}</p>}
        </div>
      )}
    />
  );
}
