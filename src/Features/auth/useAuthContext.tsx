import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { router } from "../../App";

import type { ContentUserType } from "./UserType";

interface AuthContextValues {
  user: ContentUserType;
  login(user: ContentUserType): void;
  logout(): void;
  hasUserInfo: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ContentUserType>({} as ContentUserType);
  const pathname = router.state.location.pathname;

  const hasUserInfo =
    user.email !== undefined && user.id !== 0 && user.role !== null;
  const isAdmin = user.role === "admin";

  function logout() {
    setUser({} as ContentUserType);

    if (!pathname.startsWith("/user")) {
      router.navigate("/user/login");
    }
  }

  function login(user: ContentUserType) {
    setUser(user);
  }

  const value: AuthContextValues = {
    user,
    login,
    logout,
    hasUserInfo,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext(requireAdmin = false) {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext usado fora do AuthContextProvider!");
  }

  useEffect(() => {
    if (!requireAdmin) return;

    if (context.hasUserInfo && !context.isAdmin) {
      router.navigate("/");

      toast.info("Você não é admin! Explore os conteúdos do site.");
    }
  }, [requireAdmin, context.hasUserInfo, context.isAdmin]);

  return context;
}

export { AuthContextProvider, useAuthContext };
