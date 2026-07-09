import { useCallback, useEffect, useState } from "react";
import type { ComponentProps } from "react";
import type { EmblaCarouselType } from "embla-carousel";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentProps<"button">;

export const PrevButton = ({
  children,
  disabled,
  className,
  ...restProps
}: PropType) => {
  const baseClasses = "embla__button embla__button--prev";
  const disabledClass = disabled ? " embla__button--disabled" : "";
  const combinedClasses =
    `${baseClasses}${disabledClass} ${className || ""}`.trim();

  return (
    <button
      className={combinedClasses}
      type="button"
      disabled={disabled}
      {...restProps}
    >
      {children || "⬅"}
    </button>
  );
};

export const NextButton = ({ disabled, className, ...restProps }: PropType) => {
  const baseClasses = "embla__button embla__button--next";
  const disabledClass = disabled ? " embla__button--disabled" : "";
  const combinedClasses =
    `${baseClasses}${disabledClass} ${className || ""}`.trim();

  return (
    <button className={combinedClasses} disabled={disabled} {...restProps}>
      {"➡"}
    </button>
  );
};
