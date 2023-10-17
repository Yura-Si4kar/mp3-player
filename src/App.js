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
  const { main, gallery, music } = useContext(Context);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = isLoggedIn();
      main.setIsAuth(isAuthenticated);
    };

    checkAuthentication();
  }, [main]);

  useEffect(() => {
    getAlbumsList().then((data) => {
      main.setLoading(true);
      gallery.setAlbums(data);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      main.setLoading(false);
    })
  }, [gallery, main]);

    useEffect(() => {
    getAudioList().then((data) => {
      main.setLoading(true);
      music.setAudioList(data);
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      main.setLoading(false);
    });
  }, [main, music]);

  return (
    <section className='vh-100 app d-flex justify-content-center text-white app'>
      <BrowserRouter>
        {main.isAuth && <NavBar />}
        <AppRouters />
      </BrowserRouter>
    </section>
  );
});
