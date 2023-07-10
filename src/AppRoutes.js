import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privatePages, publicPages } from './routes/routes'
import { Context } from './context'
import { ALBUMS_ROUTE, LOGIN_ROUTE } from './utils/consts';
import NavBar from './components/NavBar/NavBar';

export default function AppRoutes() {
    const { auth } = useContext(Context);
    
    return (
    <>
    {auth && <NavBar />}
      <Routes>
        {auth ? (
          privatePages.map((route) => (
            <Route
              path={route.path}
              element={route.components}
              caseSensitive={route.caseSensitive}
              key={route.path}
            />
          ))
        ) : (
          publicPages.map((route) => (
            <Route
              path={route.path}
              element={route.components}
              caseSensitive={route.caseSensitive}
              key={route.path}
            />
          ))
        )}
        <Route path="/*" element={<Navigate to={auth ? ALBUMS_ROUTE : LOGIN_ROUTE} />} />
      </Routes>
    </>  
    )
}