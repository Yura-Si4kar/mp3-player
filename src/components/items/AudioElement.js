import React from 'react';
import { ButtonGroup, DropdownButton, ListGroup, ProgressBar } from 'react-bootstrap';
import MyButton from '../UI/button/MyButton';
import play from '../../assets/play.svg';
import pause from '../../assets/pause.svg';
import { observer } from 'mobx-react-lite';

export default observer(function AudioElement({ index, player }) {
  const handlePlayClick = () => {
    player.play(index)
  };

  const handleProgressBarClick = (e) => {
    if (player.currentAudioIndex === index) {
      player.handleProgressClick(e);
    }
  };
  
  return (
    <>
      <ListGroup.Item className="d-flex justify-content-between m-1 w-50" style={{ padding: '5px', backgroundColor: 'lightblue' }}>
        <MyButton variant="link" onClick={handlePlayClick}>
          {player.currentAudioIndex === index && player.isPlaying ? (
            <img width={30} height={30} src={pause} alt="pause" />
          ) : (
            <img width={30} height={30} src={play} alt="play" />
          )}
        </MyButton>
        <ProgressBar onClick={handleProgressBarClick} animated now={player.currentAudioIndex === index ? player.progress : null} className="w-100 align-self-center" />
        <DropdownButton variant="link" className="volume m-0 p-0" title="">
          <input type="range" min={0} max={10} onChange={e => player.handleChangeVolume(e.target.value)}/>
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