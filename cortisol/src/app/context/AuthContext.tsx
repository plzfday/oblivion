'use client'

import React, { createContext, useEffect, useState } from 'react';

export interface User {
  username: string;
  password: string;
  email: string;
}

export type UserContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const userContextValue: UserContextType = {
    user,
    login,
    logout
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserState() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}