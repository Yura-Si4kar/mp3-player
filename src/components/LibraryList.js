// LibraryList.js
import React, { useContext } from 'react';
import { ListGroup } from "react-bootstrap";
import AudioElement from "./items/AudioElement";
import AudioPlayer from "../store/AudioPlayer";
import { Context } from '../context';

export default function LibraryList({audioList}) {
  const { player } = useContext(Context);
  
  return (
    <ListGroup className='w-100 bg-black h-75'>
      {audioList.map((item, i) => (
        <AudioElement
          key={i}
          index={i}
          player={player}
        />
      ))}
    </ListGroup>
  );
}
