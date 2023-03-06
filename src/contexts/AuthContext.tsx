/* eslint-disable react/jsx-no-constructed-context-values */
import type { Waiter } from '@types';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  waiter: Waiter | null;
  setWaiter: Dispatch<SetStateAction<Waiter | null>>;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // if (localStorage.getItem('isAuthenticated')) {
    //   return Boolean(localStorage.getItem('isAuthenticated'));
    // }
    // return false;
    return true;
  });

  const [waiter, setWaiter] = useState<Waiter | null>(null);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, waiter, setWaiter }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuthContext must be used within a AuthContextProvider');

  return context;
}
