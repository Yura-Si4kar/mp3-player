import React, { useContext } from 'react'
import { ButtonGroup, DropdownButton, ListGroup, ProgressBar } from 'react-bootstrap';
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';
import { observer } from 'mobx-react-lite';
import pause from '../../img/pause.svg';
import play from '../../img/play.svg';
import { Context } from '../../context';
import { useLocation } from 'react-router-dom';

export default observer(function AudioItem({ audio, index, addAudioToCurrentAlbum, deleteAudio }) {
  const { music } = useContext(Context);
  const {pathname} = useLocation();

  const handlePlay = () => {
    music.play(index);   
  }

  const handleProgressBarClick = (e) => {
    if (music.currentAudioIndex === index) {
      music.handleProgressClick(e);
    }
  };

  return (
    <>
      <ListGroup.Item className="d-flex justify-content-between m-1 w-100" style={{ padding: '5px', backgroundColor: 'lightblue' }}>
        <MyButton variant="link" onClick={handlePlay}>
        {music.currentAudioIndex === index && music.isPlaying ? 
          <img width={30} height={30} src={pause} alt="pause" />
          :
          <img width={30} height={30} src={play} alt="play" />
          }
        </MyButton>
        <div className='w-100' style={{overflow: 'hidden'}}>
          <h6>{ audio.name }</h6>
          <ProgressBar onClick={handleProgressBarClick} animated now={music.currentAudioIndex === index ? music.progress : null} className="w-100 align-self-center" />
        </div>
        <DropdownButton variant="link" className="volume m-0 p-0" title="">
          <MyInput type="range" min={0} max={10} onChange={e => music.handleChangeVolume(e.target.value)}/>
        </DropdownButton>
        <ButtonGroup>
          {pathname.includes('albums') && audio.source === 'list' ? (
            <MyButton variant="link" className="text-decoration-none p-1 mx-1" onClick={() => addAudioToCurrentAlbum(audio)}>
              &#10010;
            </MyButton>)
            : null
          }
          <MyButton variant="link" className="text-decoration-none p-1 mx-1" onClick={() => deleteAudio(audio)}>
            &#10008;
          </MyButton>
        </ButtonGroup>
      </ListGroup.Item>
    </>
  );
})