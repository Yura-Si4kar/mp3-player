import React from 'react'
import AudioElement from './items/AudioElement'
import { ListGroup } from 'react-bootstrap';

export default function LibraryList({ audio }) {
  return (
    <ListGroup className='w-100 bg-black h-75'>
      {audio.map((item, i) => <AudioElement key={i} item={item} list={audio} />)}
    </ListGroup>
  )
}