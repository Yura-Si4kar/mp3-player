import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Context } from './context';
import { isLoggedIn } from './firebase/session';
import Loader from './components/Loader/Loader';
import { getAlbumsList } from './firebase/albumsActions';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = isLoggedIn();
      setAuth(isAuthenticated);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    getAlbumsList()
      .then((albums) => {
        setAlbums(albums);
      })
      .catch((error) => {
        console.error("Error getting albums: ", error);
      });
  }, []);

  console.log(albums);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className='vh-100 app d-flex justify-content-center text-white' style={{ backgroundColor: '#000000' }}>
      <Context.Provider value={{
        auth,
        setAuth,
        loading,
        albums,
        setAlbums
      }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;