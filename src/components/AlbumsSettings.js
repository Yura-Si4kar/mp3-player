import { useContext, useState } from "react";
import { Context } from "../context";
import { Form, FormGroup } from "react-bootstrap";
import MyInput from "./UI/MyInput";
import MyButton from "./UI/MyButton";
import MyTabs from "./UI/MyTabs";
import { uploadPhoto } from "../firebase/uploadApi";
import { addAlbumToStore } from "../firebase/albumsApi";
import { observer } from "mobx-react-lite";
import { getAuthUserId } from "../firebase/userApi";

export default observer(function AlbumsSettings() {
    const { gallery } = useContext(Context);
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
            const userId = await getAuthUserId();
            const newAlbum = {
                title: name,
                img: photoURL,
                list: [],
                userId
            };

            gallery.setAlbum(newAlbum);
            await addAlbumToStore(newAlbum);
            setName('');
            setFile(null);
        } catch (error) {
            alert('Помилка додавання альбому:', error);
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
})