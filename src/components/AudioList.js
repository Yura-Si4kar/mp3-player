import React from 'react'
import AudioItem from './items/AudioItem'

export default function AudioList({list, handleAddToAlbum}) {
    return (
        <div className='d-flex flex-sm-wrap'>
            {list.map((audio, i) => (<AudioItem key={i} index={i} audio={audio} handleAddToAlbum={handleAddToAlbum} />))}
        </div>
    )
}