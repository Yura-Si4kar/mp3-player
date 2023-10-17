import React, { useContext, useState } from 'react'
import { Col, Container } from 'react-bootstrap';
import MyButton from '../components/UI/MyButton';
import AudioList from '../components/AudioList';
import Modals from '../components/Modals';
import { Context } from '../context';
import { observer } from 'mobx-react-lite';

export default observer(function Library() {
  const { music } = useContext(Context);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  return (
    <Col sm={9}>
      <Container className='d-flex flex-column align-items-center h-100'>
        <AudioList list={music.list} />
        <MyButton variant={'success'} onClick={handleShow}>Додати аудіозаписи</MyButton>
        <Modals show={show} hide={handleClose}/>
      </Container>
    </Col>
  )
})