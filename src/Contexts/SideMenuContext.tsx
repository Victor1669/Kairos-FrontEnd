import { createContext, useContext, useEffect, useState } from "react";

import { useOutsideClick } from "../Hooks/useOutsideClick";

interface SideMenuContextValues {
  menuRef: React.RefObject<HTMLElement | null>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  close(): void;
}

const SideMenuContext = createContext<SideMenuContextValues | undefined>(
  undefined,
);

export function SideMenuContextProvider({
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

  const value: SideMenuContextValues = {
    menuRef,
    showMenu,
    setShowMenu,
    close,
  };

  return (
    <SideMenuContext.Provider value={value}>
      {children}
    </SideMenuContext.Provider>
  );
}

export function useSideMenuContext() {
  const context = useContext(SideMenuContext);

  if (context === undefined) {
    throw new Error(
      "SideMenuContext deve ser usado dentro de SideMenuContextProvider!",
    );
  }

  return context;
}
