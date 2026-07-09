import { useEffect, useRef } from "react";

export function useOutsideClick({
  handler,
  listenCapturing,
}: {
  handler(): void;
  listenCapturing: boolean;
}) {
  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return modalRef;
}
