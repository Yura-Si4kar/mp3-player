import React, { useContext, useState } from 'react';
import { addAlbumToStore } from '../firebase/albumsActions';
import { Form, FormGroup } from 'react-bootstrap';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import { Context } from '../context';

export default function SettingsAlbums() {
    const { albums, setAlbums } = useContext(Context);
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const addAlbum = () => {
        const newAlbum = { 
            id: Date.now(),
            title: name,
            list: ''
        };
        
        setAlbums([...albums, newAlbum]);
        addAlbumToStore(newAlbum);
        setName('');
    };

    return (
        <Form>
            <FormGroup className='mb-3'>
                <Form.Label>Додати альбом:</Form.Label>
                <FormGroup className='d-flex align-items-center'>
                    <MyInput
                        type='file'
                        className='w-25 me-2'
                        />
                        <Form.Label>Додайте обкладинку альбома</Form.Label>
                </FormGroup>
                <div className='d-flex mt-3'>
                    <MyInput
                        value={name}
                        className='w-25 me-3'
                        type='text'
                        placeholder='Вкажіть назву альбому'
                        onChange={handleInputChange}
                    />
                    <MyButton onClick={addAlbum}>Додати альбом</MyButton>
                </div>
            </FormGroup>
        </Form>
    );
}