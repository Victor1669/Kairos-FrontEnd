import { forwardRef, useImperativeHandle } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import "./embla.css";

interface PropType<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  render: (item: T, index: number) => React.ReactNode;
  options?: EmblaOptionsType;
}

export interface EmblaCarouselRef {
  next: () => void;
  prev: () => void;
  scrollTo: (index: number) => void;
}

function EmblaCarouselInner<T>(
  { data, render, options, ...divProps }: PropType<T>,
  ref: React.ForwardedRef<EmblaCarouselRef>,
) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useImperativeHandle(
    ref,
    () => ({
      next: () => emblaApi?.scrollNext(),
      prev: () => emblaApi?.scrollPrev(),
      scrollTo: (index: number) => emblaApi?.scrollTo(index),
    }),
    [emblaApi],
  );

  return (
    <div {...divProps} className={`embla ${divProps.className ?? ""}`}>
      <PrevButton
        className="embla__button"
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
      />

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {data.map((item, index) => render(item, index))}
        </div>
      </div>

      <NextButton
        className="embla__button"
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
      />
    </div>
  );
}

const EmblaCarousel = forwardRef(EmblaCarouselInner) as <T>(
  props: PropType<T> & {
    ref?: React.Ref<EmblaCarouselRef>;
  },
) => React.ReactElement;

export default EmblaCarousel;
