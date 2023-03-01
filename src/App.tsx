import { AuthProvider } from 'contexts/AuthContext';
import { Routes } from 'routes';
import { GlobalStyles } from 'styles/global';

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};
