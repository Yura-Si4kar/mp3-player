import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Context } from './context';
import { isLoggedIn } from './firebase/session';
import Loader from './components/Loader/Loader';
import { getAlbumsList } from './firebase/albumsActions';
import { getAudioList } from './firebase/uploadFiles';
import AudioPlayer from './store/AudioPlayer';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const player = new AudioPlayer(audioList);

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
        setLoading(true);
        setAlbums(albums);
      })
      .catch((error) => {
        console.error("Error getting albums: ", error);
      }).finally(() => {
        setLoading(false);
      });
  }, [auth]);
  
  useEffect(() => {
    getAudioList().then((data) => {
      setLoading(true);
      setAudioList(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='vh-100 app d-flex justify-content-center text-white' style={{ backgroundColor: '#000000' }}>
      <Context.Provider value={{ auth, setAuth, loading, setLoading, albums, setAlbums, audioList, setAudioList, player }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;