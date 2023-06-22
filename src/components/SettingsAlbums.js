import React, { useContext, useState } from 'react';
import { addAlbumToStore } from '../firebase/albumsActions';
import { Form, FormGroup } from 'react-bootstrap';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import { Context } from '../context';
import { uploadPhoto } from '../firebase/uploadFiles';
import MyTabs from './UI/tabs/MyTabs';

export default function SettingsAlbums() {
    const { albums, setAlbums } = useContext(Context);
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleFileInputChange = e => {
        setFile(e.target.files[0]);
    }

    const addAlbum = async () => {
        try {
            const photoURL = await uploadPhoto(file);
            const newAlbum = {
                title: name,
                img: photoURL,
                list: [],
            };

            setAlbums([...albums, newAlbum]);
            await addAlbumToStore(newAlbum);
            setName('');
            setFile(null);
        } catch (error) {
            console.error('Помилка додавання альбому:', error);
        }
    };

    return (
        <>
        <Form>
            <FormGroup className='mb-3'>
                <Form.Label>Додати альбом:</Form.Label>
                <FormGroup className='d-flex align-items-center'>
                    <MyInput
                        type='file'
                        className='w-25 me-2'
                        onChange={handleFileInputChange}
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
        <MyTabs/>
        </>
    );
}