import React, { useContext, useEffect } from 'react'
import { Context } from '../context'
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AudioList from '../components/AudioList';
import { addAudioRefToList, deleteAudioFromCurrentAlbum, getCurrentAlbumAudioList } from '../firebase/audioApi';

export default observer(function AlbumPage() {
  const { id } = useParams();
  const { music } = useContext(Context);

  useEffect(() => {
    getCurrentAlbumAudioList(id).then((data) => {
      music.setCurrentAlbumList(data);
    });
  }, [id, music]);

  const addAudioToCurrentAlbum = async (audio) => {
    try {
      await addAudioRefToList({ ...audio, source: 'album' }, id);
      music.setAudioToCurrentAlbum(audio);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAudio = async (audio) => {
    if (audio.source === 'album') {
      await deleteAudioFromCurrentAlbum(id, audio.id);
      music.deleteAudioFromCurrentAlbumList(audio.id);
    }
  }

  return (
    <section className='col-9 d-flex'>
      <div className='w-50'>
        <h2>Список аудіозаписів { }</h2>
        <AudioList
          list={music.currentAlbumList}
          deleteAudio={deleteAudio}
        />
      </div>
      <div className='w-50 px-3'>
        <AudioList 
          list={music.list}
          addAudioToCurrentAlbum={addAudioToCurrentAlbum} 
          deleteAudio={deleteAudio}
        />
      </div>
    </section>
  )
})
