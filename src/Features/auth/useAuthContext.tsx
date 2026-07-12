import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { ContentUserType } from "./UserType";
import { toast } from "react-toastify";

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

  const hasUserInfo =
    user.email !== undefined && user.id !== 0 && user.role !== null;
  const isAdmin = user.role === "admin";

  function logout() {
    setUser({} as ContentUserType);
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

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!requireAdmin) return;

    if (context.hasUserInfo && !context.isAdmin) {
      navigate("/");

      toast.info("Você não é admin! Explore os conteúdos do site.");
    }
  }, [
    location.pathname,
    requireAdmin,
    context.hasUserInfo,
    context.isAdmin,
    navigate,
  ]);

  return context;
}

export { AuthContextProvider, useAuthContext };
