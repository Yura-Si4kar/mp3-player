import React, { useContext, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Context } from '../context';
import AudioFillter from '../components/AudioFillter';
import AudioList from '../components/AudioList';
import { useFilteredAudio } from '../hooks/useFilteredAudio';

export default function Search() {
  const { audioList } = useContext(Context);
  const [filter, setFilter] = useState('');
  const filteredAudiosList = useFilteredAudio(audioList, filter);

  return (
    <Col sm={9} className='p-3'>
      <AudioFillter filter={filter} setFilter={ setFilter } />
      <AudioList audioList={filteredAudiosList} />
    </Col>
  )
}