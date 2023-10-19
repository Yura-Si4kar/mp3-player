import React, { useContext, useEffect } from 'react'
import { Context } from '../context'
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AudioList from '../components/AudioList';
import { addAudioRefToList, getCurrentAlbumAudioList } from '../firebase/audioApi';

export default observer(function AlbumPage() {
  const { id } = useParams();
  const { gallery, music } = useContext(Context);

  // useEffect(() => {
  //   const list = getCurrentAlbumAudioList(id);
  //   music.setCurrentAlbumList(list);
  // }, [id, music]);

  const handleAddToAlbum = async (audio) => {
    try {
      await addAudioRefToList(audio, id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='col-9 d-flex'>
      <div className='w-50'>
        <AudioList list={music.currentAlbumList}/>
      </div>
      <div className='w-50 px-3'>
        <AudioList 
          list={music.list}
          handleAddToAlbum={handleAddToAlbum} 
        />
      </div>
    </section>
  )
})
