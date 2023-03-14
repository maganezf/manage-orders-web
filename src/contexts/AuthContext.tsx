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
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('token')
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
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
