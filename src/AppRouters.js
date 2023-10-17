 import React, { useContext } from 'react';
import { privatePages, publicPages } from './routes/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from './context';
import { observer } from 'mobx-react-lite';
import { ALBUMS_ROUTE, LOGIN_ROUTE } from './utils/consts';

export default observer(function AppRouters() {
  const { main } = useContext(Context);
  return (
    <>
      <Routes>
        {main.isAuth
          ? privatePages.map((route) => (
              <Route
                path={route.path}
                element={route.components}
                caseSensitive={route.caseSensitive}
                key={route.path}
              />
            ))
          : publicPages.map((route) => (
              <Route
                path={route.path}
                element={route.components}
                caseSensitive={route.caseSensitive}
                key={route.path}
              />
            ))}
        <Route
          path="/*"
          element={<Navigate to={main.isAuth ? ALBUMS_ROUTE : LOGIN_ROUTE} />}
        />
      </Routes>
    </>
  );
});
