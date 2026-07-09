import { createContext, useContext, useState } from "react";
import type { UserType } from "./UserType";

interface AuthContextValues {}

const AuthContext = createContext<AuthContextValues | undefined>(undefined);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>({} as UserType);

  function logout() {
    setUser({} as UserType);
  }

  function login(user: UserType) {
    setUser(user);
  }

  const value: AuthContextValues = { user, login, logout };

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
