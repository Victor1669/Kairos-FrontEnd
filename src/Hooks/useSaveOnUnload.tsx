import { useEffect } from "react";

// eslint-disable-next-line
export const useSaveOnUnload = (key: string, data: any) => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(key, JSON.stringify(data));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [key, data]);
};
