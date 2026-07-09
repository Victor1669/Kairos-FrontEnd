import { createContext, useContext, useState } from "react";
import type { ContentUserType } from "./UserType";

interface AuthContextValues {
  user: ContentUserType;
  login(user: ContentUserType): void;
  logout(): void;
  hasUserInfo: boolean;
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ContentUserType>({} as ContentUserType);

  const hasUserInfo =
    user.email !== undefined && user.id !== 0 && user.role !== null;

  console.log(hasUserInfo);

  function logout() {
    setUser({} as ContentUserType);
  }

  function login(user: ContentUserType) {
    setUser(user);
  }

  const value: AuthContextValues = { user, login, logout, hasUserInfo };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext usado fora do AuthContextProvider!");
  }

  return context;
}

export { AuthContextProvider, useAuthContext };
