import { useEffect } from "react";

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
