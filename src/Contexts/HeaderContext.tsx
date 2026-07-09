import { createContext, useContext, useEffect, useState } from "react";

import { useOutsideClick } from "../Hooks/useOutsideClick";

interface HeaderContextValues {
  menuRef: React.RefObject<HTMLElement | null>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  close(): void;
}

const HeaderContext = createContext<HeaderContextValues | undefined>(undefined);

export function HeaderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const close = () => setShowMenu(false);

  const menuRef = useOutsideClick({ handler: close, listenCapturing: true });

  useEffect(() => {
    const main = document.getElementsByTagName("main").item(0);

    if (showMenu && main) {
      main.style.overflow = "hidden";
    }

    return () => {
      if (main) main.style.overflowY = "auto";
    };
  }, [showMenu]);

  const value: HeaderContextValues = {
    menuRef,
    showMenu,
    setShowMenu,
    close,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}

export function useHeaderContext() {
  const context = useContext(HeaderContext);

  if (context === undefined) {
    throw new Error(
      "HeaderContext deve ser usado dentro de HeaderContextProvider!",
    );
  }

  return context;
}
