import React, { useState } from 'react'
import { ButtonGroup, DropdownButton, ListGroup, ProgressBar } from 'react-bootstrap'
import MyButton from '../UI/button/MyButton'
import './AudioElement.css';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import play from '../../assets/play.svg';
import pause from '../../assets/pause.svg';
import Alert from '../UI/alert/Alert';

export default function AudioElement({ item }) {
    const { isPlaying, progress, startPlay, handleProgressClick, setVolume } = useAudioPlayer(item);
    const [show, setShow] = useState(false);

    const onShow = () => {
        setShow(true);
    }

    const onHide = () => {
        setShow(false);
    }

    const onAgree = () => {
        console.log(item);
        // onHide();
    }

    return (
        <>
            <ListGroup.Item className='d-flex justify-content-between m-1 w-50' style={{padding: '5px', backgroundColor: 'lightblue'}}>
                <MyButton variant={'link'} onClick={startPlay}>
                    {isPlaying
                        ?
                        <img width={30} height={30} src={pause} alt='pause'/>
                        :
                        <img width={30} height={30} src={play} alt='play'/>
                    }
                </MyButton>
                <ProgressBar onClick={handleProgressClick} animated now={progress} className='w-100 align-self-center'/>
                <DropdownButton variant='link' className='volume m-0 p-0' title=''>
                    <input type='range' min={0} max={10} onChange={e => setVolume(e.target.value)}/>
                </DropdownButton>
                <ButtonGroup>
                    <MyButton variant={'link'} className='text-decoration-none p-1 mx-1'>&#10010;</MyButton>
                    <MyButton 
                        variant={'link'} 
                        className='text-decoration-none p-1 mx-1'
                        onClick={onShow}
                    >
                        &#10008;
                    </MyButton>
                </ButtonGroup>
            </ListGroup.Item>
            <Alert show={show} onHide={onHide} onAgree={ onAgree } />
        </>
    )
}