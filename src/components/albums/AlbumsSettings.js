import { useContext, useState } from "react";
import { Context } from "../../context";
import { Form, FormGroup } from "react-bootstrap";
import MyInput from "../UI/MyInput";
import MyButton from "../UI/MyButton";
import MyTabs from "../UI/MyTabs";
import { uploadPhoto } from "../../firebase/uploadApi";
import { addAlbumToStore } from "../../firebase/albumsApi";
import { observer } from "mobx-react-lite";
import { getAuthUserId } from "../../firebase/userApi";

export default observer(function AlbumsSettings() {
    const { app, gallery } = useContext(Context);
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
            app.setLoading(true);
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
        } finally {
            app.setLoading(false);
        }
    };

    return (
        <>
        <Form className="p-1">
            <FormGroup className='mb-3'>
                <Form.Label>Додати альбом:</Form.Label>
                <FormGroup className='d-flex align-items-center'>
                    <MyInput
                        type='file'
                        className='w-50 me-2'
                        onChange={handleFileInputChange}
                    />
                    <Form.Label style={{fontSize: '12px', textWrap: 'balance'}}>Додайте обкладинку</Form.Label>
                </FormGroup>
                <div className='d-flex flex-column mt-3'>
                    <MyInput
                        value={name}
                        className='w-100 me-3 mb-2'
                        type='text'
                        placeholder='Назва альбому'
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