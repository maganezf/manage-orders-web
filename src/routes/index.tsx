import { PrivateRoute } from 'components/routing/PrivateRoute';
import { RoutesWrapper } from 'components/routing/RoutesWrapper';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import { SignUp } from 'pages/SignUp';
import { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <RoutesWrapper>
          <Route
            path="/login"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Login />
              </Suspense>
            }
          />

          <Route
            path="/signup"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <SignUp />
              </Suspense>
            }
          />

          <Route
            path="/"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute page={<Home />} />
              </Suspense>
            }
          />

          <Route path="*" element={<p>Not Found 404</p>} />
        </RoutesWrapper>
      </Suspense>
    </BrowserRouter>
  );
};
