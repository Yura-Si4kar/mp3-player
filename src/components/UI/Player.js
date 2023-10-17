import React from 'react';
import { ButtonGroup, ProgressBar } from 'react-bootstrap';
// import play from '../../img/play.svg';
// import pause from '../../img/pause.svg';
import next from '../../img/next.svg';
import prew from '../../img/prew.svg';
import MyButton from './MyButton';

export default function Player() {
    return (
        <div className='w-100 text-center'>
            <div>
                <img src='#' alt='title'/>
            </div>
            <div>
                <h3>composition</h3>
                <p>artist</p>
            </div>
            <ProgressBar animated now={70} className="w-100" />
            <ButtonGroup className='mt-2'>
                <MyButton variant='link'>
                    <img src={prew} alt='prew'/>
                </MyButton>
                <MyButton variant='link'>
                    {/* {player.isPlaying
                        ?
                        <img width={62} height={62} src={pause} alt='pause' />
                        :
                        <img width={62} height={62} src={play} alt='play' />
                    } */}
                </MyButton>
                <MyButton variant='link'>
                    <img src={next} alt='next'/>
                </MyButton>
            </ButtonGroup>
        </div>
    )
}