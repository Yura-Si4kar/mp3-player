import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouters from './AppRouters';
import { observer } from 'mobx-react-lite';
import { Context } from '../context';
import NavBar from '../components/NavBar';
import { isLoggedIn } from '../firebase/session';
import { getAlbumsList } from '../firebase/albumsApi';
import { getAudioList } from '../firebase/audioApi';
import { Container, Spinner } from 'react-bootstrap';

export default observer(function App() {
  const { app, gallery, player } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isAuthenticated = isLoggedIn().accessToken;
        const userData = isLoggedIn().user;
        app.setIsAuth(!!isAuthenticated);
        app.setUser(userData);

        if (!!isAuthenticated) {
          app.setLoading(true);
          const albumsData = await getAlbumsList();
          const currentUserData = albumsData.filter((data) => data.userId === app.user.uid);
          gallery.setAlbums(currentUserData);
          
          const audioData = await getAudioList();
          player.setAudioList(audioData);
          player.setIsAlbum(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        app.setLoading(false);
      }
    };

    fetchData();
  }, [app, gallery, player]);

  if (app.loading) {
    return (
      <Spinner animation='grow' />)
  }

  console.log(gallery.albums);

  return (
    <Container className='app'>
      <BrowserRouter>
        {app.isAuth && <NavBar />}
        <AppRouters />
      </BrowserRouter>
    </Container>
  );
});