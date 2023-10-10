import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '../context';
import AudioElement from '../components/items/AudioElement';
import { addAudioRefToList, getCurrentAlbumAudioList } from '../firebase/audioActions';

export default function AlbumPage() {
  const { id } = useParams();
  const { audioList } = useContext(Context);
  const { player } = useContext(Context);
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    getCurrentAlbumAudioList(id).then((data) => {
      setAlbumList(data)
    })
  }, [id, albumList])

  const handleAddToAlbum = async (audio) => {
    try {
      await addAudioRefToList(audio, id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col sm={9}>
      <Container>
        <h1>Список аудіозаписів: {id}</h1>
        <div className="d-flex">
          <div className="w-50">
            <h2>Аудіозаписи в альбомі:</h2>
              <ListGroup>
              {albumList.map((audio, index) => (
                <AudioElement 
                  key={index} 
                  index={index} 
                  item={audio} 
                  player={player} 
                  handleAddToAlbum={handleAddToAlbum}  
                />
              ))}
            </ListGroup>
          </div>
          <div className="w-50">
            <h2>Усі аудіозаписи:</h2>
            <ListGroup>
              {audioList.map((audio, index) => (
                <AudioElement 
                  key={index} 
                  index={index} 
                  item={audio} 
                  player={player} 
                  handleAddToAlbum={handleAddToAlbum} 
                />
              ))}
            </ListGroup>
          </div>
        </div>
      </Container>
    </Col>
  )
}