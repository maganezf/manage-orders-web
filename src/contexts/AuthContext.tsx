import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // if eslint config is correct, you have see an error below
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
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
