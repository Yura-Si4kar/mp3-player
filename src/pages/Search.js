import React, { useContext, useEffect, useState } from 'react'
import AudioFillter from '../components/audio/AudioFillter';
import AudioList from '../components/audio/AudioList';
import { Col } from 'react-bootstrap';
import { Context } from '../context';
import { observer } from 'mobx-react-lite';
import { useFilteredAudio } from '../hooks/useFilteredAudio';

export default observer(function Search() {
  const { app, player } = useContext(Context);
  const [filter, setFilter] = useState('');
  const filteredAudiosList = useFilteredAudio(player.list, filter);

  useEffect(() => {
    player.setIsAlbum(false);
  })

  return (
    <Col sm={app.isOpen ? 9 : 11} style={{ transition: 'width 0.3s' }} className='p-3'>
      <AudioFillter filter={filter} setFilter={ setFilter } />
      <AudioList list={filteredAudiosList} />
    </Col>
  )
})