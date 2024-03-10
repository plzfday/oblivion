import {createContext, useContext, useState} from "react";
import * as React from "react";

interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

interface AuthProviderProps {
  children?: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
      <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
        {children}
      </AuthContext.Provider>
);
}

export function useAuthContext() {
  return useContext(AuthContext);
}