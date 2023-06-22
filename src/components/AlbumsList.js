import React from 'react';
import AlbumsItem from './items/AlbumsItem';

export default function AlbumsList({ albums }) {
  return (
    <div className='d-flex flex-sm-wrap'>
      {albums.map((album) => (<AlbumsItem key={album.id} album={album}/>))}
    </div>
  )
}