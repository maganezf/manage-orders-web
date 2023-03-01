import { PrivateRoute } from 'components/routing/PrivateRoute';
import { RoutesWrapper } from 'components/routing/RoutesWrapper';
import { Home } from 'pages/Home';
import { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <RoutesWrapper>
          <Route
            path="/"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/one"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute page={<p>Page one</p>} />
              </Suspense>
            }
          />
          <Route
            path="/two"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <p>Page two</p>
              </Suspense>
            }
          />

          <Route path="*" element={<p>Not Found 404</p>} />
        </RoutesWrapper>
      </Suspense>
    </BrowserRouter>
  );
};
