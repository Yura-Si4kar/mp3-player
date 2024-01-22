import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import AddAudioToAlbumModal from '../components/modals/AddAudioToAlbumModal';
import MyButton from '../components/UI/MyButton';
import { useParams } from 'react-router-dom';
import { addAudioRefToList, deleteAudioFromCurrentAlbum, getCurrentAlbumAudioList } from '../firebase/audioApi';
import { Context } from '../context';
import AudioItem from '../components/items/AudioItem';

export default observer(function AlbumPage() {
  const { app, player } = useContext(Context);
  const [show, setShow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getCurrentAlbumAudioList(id).then((data) => {
      player.setAlbumAudioList(data);
      player.setIsAlbum(true);
    }).catch((e) => {
      console.error(e)
    })

  }, [id, player])

  const handleShow = () => {
    setShow(true);
  }

  const onClose = () => {
    setShow(false);
  }

  const addAudioToAlbum = (audio) => {
    addAudioRefToList(audio, id).then((data) => {
      player.setAlbumAudioList(data);
    });
  }

  const deleteAudioFromAlbumList = (audioId) => {
    deleteAudioFromCurrentAlbum(id, audioId).then((data) => {
      player.setAlbumAudioList(data);
    })
  }

  return (
    <section className={app.isOpen ? 'col-9 album' : 'col-11 album'}>
      <div className='col-11 px-3'>
        {player.albumAudioList.map((audio, i) => <AudioItem key={audio.id} audio={audio} index={i} deleteAudio={deleteAudioFromAlbumList} />)}
      </div>
      <MyButton className='album-setting' variant="outline" onClick={handleShow}>&#8942;</MyButton>
      <AddAudioToAlbumModal show={show} hide={onClose} addAudioToAlbum={addAudioToAlbum} />
    </section>
  )
})