import React from 'react';
import { ButtonGroup, DropdownButton, ListGroup, ProgressBar } from 'react-bootstrap';
import MyButton from '../UI/button/MyButton';
import play from '../../assets/play.svg';
import pause from '../../assets/pause.svg';

export default function AudioElement({
  index,
  list,
  isPlaying,
  progress,
  startPlay,
  handleProgressClick,
  currentAudioIndex
}) {
  const handlePlayClick = () => {
    startPlay(index);
  };

  return (
        <>
            <ListGroup.Item className="d-flex justify-content-between m-1 w-50" style={{ padding: '5px', backgroundColor: 'lightblue' }}>
                <MyButton variant="link" onClick={handlePlayClick}>
                {currentAudioIndex === index && isPlaying ? (
                    <img width={30} height={30} src={pause} alt="pause" />
                ) : (
                    <img width={30} height={30} src={play} alt="play" />
                )}
                </MyButton>                   
                    <ProgressBar onClick={handleProgressClick} animated now={currentAudioIndex === index ? progress : null} className="w-100 align-self-center" />
                <DropdownButton variant="link" className="volume m-0 p-0" title="">
                <input type="range" min={0} max={10} />
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
}
