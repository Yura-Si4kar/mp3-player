import React from 'react'
import AudioItem from './items/AudioItem'

export default function AudioList({list}) {
    return (
        <div className='d-flex flex-sm-wrap'>
            {list.map((audio, i) => (<AudioItem key={i} audio={audio}/>))}
        </div>
    )
}
