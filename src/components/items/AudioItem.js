import React from 'react'
import { ButtonGroup, DropdownButton, ListGroup, ProgressBar } from 'react-bootstrap';
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';
import { observer } from 'mobx-react-lite';

export default observer(function AudioItem({audio}) {
return (
    <>
      <ListGroup.Item className="d-flex justify-content-between m-1 w-50" style={{ padding: '5px', backgroundColor: 'lightblue' }}>
        <MyButton variant="link">
          {/* {player.currentAudioIndex === index && player.isPlaying ? (
            <img width={30} height={30} src={pause} alt="pause" />
          ) : (
            <img width={30} height={30} src={play} alt="play" />
          )} */}
        </MyButton>
        <div className='w-100' style={{overflow: 'hidden'}}>
          <h6>{ audio.name }</h6>
          <ProgressBar animated now={20} className="w-100 align-self-center" />
        </div>
        <DropdownButton variant="link" className="volume m-0 p-0" title="">
          <MyInput type="range" min={0} max={10}/>
        </DropdownButton>
        <ButtonGroup>
          <MyButton variant="link" className="text-decoration-none p-1 mx-1">
            &#10010;
          </MyButton>
          <MyButton variant="link" className="text-decoration-none p-1 mx-1">
            &#10008;
          </MyButton>
        </ButtonGroup>
      </ListGroup.Item>
    </>
  );
})