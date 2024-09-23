"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  progress: Record<number, any>; 
  setProgress: React.Dispatch<React.SetStateAction<Record<number, any>>>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [progress, setProgress] = useState<Record<number, any>>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, progress, setProgress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
