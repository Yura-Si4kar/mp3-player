import React from 'react'
import MyInput from './UI/input/MyInput'

export default function AudioFillter({ filter, setFilter }) {
    return (
        <MyInput
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder='Пошук...'       
        />
    )
}
