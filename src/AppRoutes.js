import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privatePages, publicPages } from './routes/pages'
import { Context } from './context'
import { HOME_ROUTE, LOGIN_ROUTE } from './utils/consts';
import NavBar from './components/NavBar';

export default function AppRoutes() {
    const { auth } = useContext(Context);
    console.log(auth);
    
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
        <Route path="/*" element={<Navigate to={auth ? HOME_ROUTE : LOGIN_ROUTE} />} />
      </Routes>
    </>  
    )
}