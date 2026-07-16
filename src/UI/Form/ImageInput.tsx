import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import type { CSSProperties, DragEvent, ChangeEvent } from "react";
import type { FieldValues, Path } from "react-hook-form";

import { useFieldValidation } from "./FormValidationContext";
import Styles from "./Form.module.css";

type ImageInputProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label?: string;
  accept?: string;
  className?: string;
  placeholder?: string | React.ReactNode;
  imageContainerClassName?: string;
  initialUrl?: string;
  style?: CSSProperties;
  maxSize?: number;
};

function isImageTypeAccepted(image: File, accept: string): boolean {
  if (!accept || accept === "*") return true;

  const acceptedTypes = accept.split(",").map((type) => type.trim());

  return acceptedTypes.some((type) => {
    if (type.endsWith("/*")) {
      return image.type.startsWith(type.replace("/*", "/"));
    }
    return image.type === type;
  });
}

function isImageSizeValid(image: File, maxSizeMB: number): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return image.size <= maxBytes;
}

export default function ImageInput<
  T extends FieldValues,
  TName extends Path<T>,
>({
  name,
  label,
  accept = "image/*",
  className = "",
  imageContainerClassName = "",
  initialUrl = "",
  placeholder,
  style,
  maxSize = 5,
}: ImageInputProps<T, TName>) {
  const { control } = useFormContext<T>();
  const { errors } = useFormState<T>({ control, name });

  const [imageName, setImageName] = useState<string>(initialUrl);
  const [imageError, setImageError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>(initialUrl);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const errorMessage = errors[name]?.message as string | undefined;
  const rules = useFieldValidation<T, TName>(name);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const clearImage = (onChange: (value: File | null) => void) => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setImageName("");
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return "";
    });
    onChange(null);
  };

  const acceptImage = (image: File, onChange: (value: File) => void) => {
    setImageError("");
    setImageName(image.name);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(image);
    });
    onChange(image);
  };

  const handleImage = (
    image: File | undefined,
    onChange: (value: File | null) => void,
  ) => {
    if (!image) {
      setImageError("");
      clearImage(onChange);
      return;
    }

    if (!isImageTypeAccepted(image, accept)) {
      setImageError("Tipo de imagem não permitido");
      clearImage(onChange);
      return;
    }

    if (!isImageSizeValid(image, maxSize)) {
      setImageError(`Imagem muito grande. Máximo permitido: ${maxSize}MB`);
      clearImage(onChange);
      return;
    }

    acceptImage(image, onChange);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void,
  ) => {
    handleImage(e.target.files?.[0], onChange);
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    onChange: (value: File | null) => void,
  ) => {
    e.preventDefault();
    setIsDragging(false);

    const image = e.dataTransfer.files?.[0];

    if (image && inputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(image);
      inputRef.current.files = dataTransfer.files;
    }

    handleImage(image, onChange);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    onChange: (value: File | null) => void,
  ) => {
    e.stopPropagation();
    setImageError("");
    clearImage(onChange);
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
            style={{ position: "relative" }}
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
              accept={accept}
              ref={(el) => {
                inputRef.current = el;
                ref(el);
              }}
              onChange={(e) => handleInputChange(e, onChange)}
            />

            {previewUrl && (
              <RemoveImageButton
                onClick={(e) => handleRemoveClick(e, onChange)}
              />
            )}

            {previewUrl && <img src={previewUrl} alt={imageName} />}

            {imageName ? (
              <p>{imageName}</p>
            ) : (
              placeholder || <p>Arraste uma imagem ou clique para selecionar</p>
            )}
          </div>

          {imageError && <p className={Styles.Error}>{imageError}</p>}
          <p className={Styles.Error} style={{ textAlign: "center" }}>
            {errorMessage}
          </p>
        </div>
      )}
    />
  );
}

function RemoveImageButton({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "absolute",
        top: "8px",
        right: "8px",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      ×
    </button>
  );
}
