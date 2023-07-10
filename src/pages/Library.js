import React, { useContext, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import MyButton from '../components/UI/button/MyButton'
import LibraryList from '../components/AudioList'
import Modals from '../components/Modals';
import { Context } from '../context';

export default function Library() {
  const { audioList } = useContext(Context);
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
        <LibraryList audioList={ audioList } />
        <Modals show={show} hide={handleClose}/>
        <MyButton variant={'success'} onClick={handleShow}>Додати аудіозаписи</MyButton>
      </Container>
    </Col>
  )
}