import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Context } from './context';
import { isLoggedIn } from './session';
import Loader from './components/Loader';

export default function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true); // Змінено значення за замовчуванням на true

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await isLoggedIn();
      setAuth(isAuthenticated);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <Loader />; // Показуємо Loader, поки встановлюється стан завантаження
  }

  return (
    <div className='vh-100 app d-flex justify-content-center text-white' style={{ backgroundColor: '#000000' }}>
      <Context.Provider value={{
        auth,
        setAuth,
        loading
      }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}