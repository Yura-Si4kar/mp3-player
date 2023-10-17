import React, { useContext, useState } from 'react'
import AudioFillter from '../components/AudioFillter';
import AudioList from '../components/AudioList';
import { Col } from 'react-bootstrap';
import { Context } from '../context';
import { observer } from 'mobx-react-lite';
import { useFilteredAudio } from '../hooks/useFilteredAudio';

export default observer(function Search() {
  const { music } = useContext(Context);
  const [filter, setFilter] = useState('');
  const filteredAudiosList = useFilteredAudio(music.list, filter);

  return (
    <Col sm={9} className='p-3'>
      <AudioFillter filter={filter} setFilter={ setFilter } />
      <AudioList list={filteredAudiosList} />
    </Col>
  )
})