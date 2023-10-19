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
    const fetchData = async () => {
      try {
        const isAuthenticated = isLoggedIn().accessToken;
        const userData = isLoggedIn().user;
        app.setIsAuth(!!isAuthenticated);
        app.setUser(userData);

        if (!!isAuthenticated) {
          const albumsData = await getAlbumsList();
          const currentUserData = albumsData.filter((data) => data.userId === app.user.uid);
          app.setLoading(true);
          gallery.setAlbums(currentUserData);  
          
          const audioData = await getAudioList();
          console.log(audioData);
          music.setAudioList(audioData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        app.setLoading(false);
      }
    };

    fetchData();
  }, [app, gallery, music]);

  return (
    <section className='vh-100 d-flex justify-content-center text-white app'>
      <BrowserRouter>
        {app.isAuth && <NavBar />}
        <AppRouters />
      </BrowserRouter>
    </section>
  );
});
