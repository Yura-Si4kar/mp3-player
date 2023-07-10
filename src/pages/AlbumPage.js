import React from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function AlbumPage() {
  const { id } = useParams();
  console.log(id);
  return (
    <Container>
      <h1>Список аудіозаписів: </h1>
    </Container>
  )
}