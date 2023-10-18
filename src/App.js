import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouters from './AppRouters';
import { observer } from 'mobx-react-lite';
import { Context } from './context';
import NavBar from './components/NavBar';
import { isLoggedIn } from './firebase/session';
import { getAlbumsList } from './firebase/albumsApi';
import { getAudioList } from './firebase/audioApi';

export default observer(function App() {
  const { app, gallery, music } = useContext(Context);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = isLoggedIn();
      app.setIsAuth(isAuthenticated);
    };

    checkAuthentication();
  }, [app]);

  useEffect(() => {
    getAlbumsList().then((data) => {
      app.setLoading(true);
      gallery.setAlbums(data);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      app.setLoading(false);
    })
  }, [gallery, app]);

  useEffect(() => {
    getAudioList().then((data) => {
      app.setLoading(true);
      music.setAudioList(data);
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      app.setLoading(false);
    });
  }, [app, music]);

  return (
    <section className='vh-100 app d-flex justify-content-center text-white app'>
      <BrowserRouter>
        {app.isAuth && <NavBar />}
        <AppRouters />
      </BrowserRouter>
    </section>
  );
});
