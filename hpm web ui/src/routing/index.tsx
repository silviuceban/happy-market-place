import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import Page404 from '../pages/Page404';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';
import LogoutPage from '../pages/LogoutPage';
import { ChallangesPage } from '../pages/ChallangesPage';
import { useSelector } from 'react-redux';
import { store } from '../store';
import { useAuth0 } from '@auth0/auth0-react';

interface RouterElement {
  url: string;
  label?: string;
  icon?: OverridableComponent<SvgIconTypeMap<Record<string, never>, 'svg'>>;
  component: () => JSX.Element;
  isProtected: boolean;
}

export const routerElements: RouterElement[] = [
  {
    url: '/',
    label: 'Products',
    component: ProductsPage,
    isProtected: false,
  },
  {
    url: '/login',
    label: 'Login',
    component: LoginPage,
    isProtected: false,
  },
  {
    url: '/cart',
    label: 'Cart',
    component: CartPage,
    isProtected: true,
  },
  {
    url: '/challanges',
    label: 'Challanges',
    component: ChallangesPage,
    isProtected: true,
  },

  //   {
  //     url: '/producs/:productId',
  //     label: 'product',
  //     // component: EditEmployeeFrom,
  //     isProtected: true,
  //   },

  {
    url: '/admin',
    label: 'Admin',
    component: AdminPage,
    isProtected: true,
  },
  {
    url: '/logout',
    label: 'Logout',
    component: LogoutPage,
    isProtected: true,
  },

  {
    url: '*',
    component: Page404,
    isProtected: false,
  },
];

export function RouterItems(): JSX.Element {
  const authState = useSelector(store.getState);
  const { isAuthenticated } = useAuth0();

  console.log(isAuthenticated);

  // const authState = { auth: { token: '123' } };
  // const authState = { auth: { token: '' } };

  const routes = useMemo(
    () =>
      routerElements.filter(
        (element) =>
          element.isProtected === isAuthenticated ||
          element.url === '/login' ||
          element.url === '/'
        // (element) => element
      ),
    [isAuthenticated]
  );

  return (
    <>
      <Routes>
        {routes.map((routerElement: RouterElement) => {
          return (
            <Route
              path={routerElement.url}
              element={<routerElement.component />}
              key={`publicRoute_${routerElement.label}`}
            />
          );
        })}
      </Routes>
    </>
  );
}
