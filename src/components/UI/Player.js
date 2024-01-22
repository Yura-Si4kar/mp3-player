import React, { useContext } from 'react';
import { ButtonGroup, ProgressBar } from 'react-bootstrap';
import play from '../../img/play.svg';
import pause from '../../img/pause.svg';
import next from '../../img/next.svg';
import prew from '../../img/prew.svg';
import MyButton from './MyButton';
import { Context } from '../../context';
import { observer } from 'mobx-react-lite';

export default observer(function Player() {
    const { player } = useContext(Context);

    const handlePlayPauseClick = () => {
        player.play(+player.currentAudioIndex);
    };

    const handleNextElementClick = () => {
        player.nextAudioElement();
    }

    const handlePreviousElementClick = () => {
        player.previousAudioElement();
    }

    return (
        <div className='w-100 text-center'>
            <div>
                <h3>composition</h3>
                <p>artist</p>
            </div>
            <ProgressBar animated now={player.progress} onClick={e => player.handleProgressClick(e)} className="w-100" />
            <ButtonGroup className='mt-2'>
                <MyButton variant='link' onClick={handlePreviousElementClick}>
                    <img src={prew} alt='prew'/>
                </MyButton>
                <MyButton variant='link' onClick={handlePlayPauseClick}>
                    {player.isPlaying
                        ?
                        <img width={62} height={62} src={pause} alt='pause' />
                        :
                        <img width={62} height={62} src={play} alt='play' />
                    }
                </MyButton>
                <MyButton variant='link' onClick={handleNextElementClick}>
                    <img src={next} alt='next'/>
                </MyButton>
            </ButtonGroup>
        </div>
    )
})