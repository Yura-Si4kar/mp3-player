import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/style.scss';
import App from './App';
import { Context } from './context';
import UserStore from './store/UserStore';
import AlbumsStore from './store/AlbumsStore';
import AudioStore from './store/AudioStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
    value={{
      app: new UserStore(),
      gallery: new AlbumsStore(),
      music: new AudioStore(),
    }}
  >
    <App />
  </Context.Provider>,
);
