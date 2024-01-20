import React, { useContext, useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap';
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
    <Col sm={9}>
      <Container className='d-flex flex-column align-items-center h-100'>
        <AudioList list={player.list} />
        <MyButton variant={'success'} onClick={handleShow}>Додати аудіозаписи</MyButton>
        <AddAudioModal show={show} hide={handleClose}/>
      </Container>
    </Col>
  )
})