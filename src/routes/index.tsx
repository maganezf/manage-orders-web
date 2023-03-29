import { PrivateRoute } from 'components/routing/PrivateRoute';
import { RoutesWrapper } from 'components/routing/RoutesWrapper';
import { Categories } from 'pages/Categories';
import { CreateCategory } from 'pages/CreateCategory';
import { CreateOrder } from 'pages/CreateOrder';
import { CreateProduct } from 'pages/CreateProduct';
import { Homepage } from 'pages/Home';
import { Products } from 'pages/Products';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <RoutesWrapper>
          <Route
            path="/sign-in"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <SignIn />
              </Suspense>
            }
          />

          <Route
            path="/sign-up"
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
                <PrivateRoute page={<Homepage />} />
              </Suspense>
            }
          />

          <Route
            path="/categories"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute page={<Categories />} />
              </Suspense>
            }
          />

          <Route
            path="/create-new-category"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute page={<CreateCategory />} />
              </Suspense>
            }
          />

          <Route
            path="/products"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute page={<Products />} />
              </Suspense>
            }
          />

          <Route
            path="/create-new-product"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute page={<CreateProduct />} />
              </Suspense>
            }
          />

          <Route
            path="/create-new-order"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute page={<CreateOrder />} />
              </Suspense>
            }
          />

          <Route path="*" element={<p>Not Found 404</p>} />
        </RoutesWrapper>
      </Suspense>
    </BrowserRouter>
  );
};
