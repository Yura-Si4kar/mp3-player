import React, { useContext, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import MyButton from '../components/UI/MyButton';
import AudioList from '../components/audio/AudioList';
import { Context } from '../context';
import { observer } from 'mobx-react-lite';
import AddAudioModal from '../components/modals/AddAudioModal';

export default observer(function Library() {
  const { player } = useContext(Context);
  const [show, setShow] = useState(false);

  useEffect(() => {
    player.setIsAlbum(false);
  })

  const handleShow = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  return (
    <div style={{ transition: 'width 0.3s', padding: '35px 5px 5px' }}>
      <ListGroup>
        <AudioList list={player.list} />
        <MyButton variant={'success'} onClick={handleShow}>Додати аудіозаписи</MyButton>
        <AddAudioModal show={show} hide={handleClose}/>
      </ListGroup>
    </div>
  )
})