import React, { useContext, useState } from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton';
import { uploadAudio } from '../firebase/uploadFiles';
import { Context } from '../context';

export default function Modals({ show, hide }) {
    const { setLoading, audioList, setAudioList } = useContext(Context);
    const [file, setFile] = useState(null);

    const uploadFile = async () => {
        try {
            setLoading(true);
            const audioUrl = await uploadAudio(file);
            setAudioList([...audioList, audioUrl]);
            setFile(null);
            setLoading(false);
            hide()
        } catch (error) {
            console.log('Помилка завантаження аудіозапису', error);
        }
    }

    return (
        <Modal show={show} onHide={hide}>
            <Modal.Header>
                <Modal.Title>Заповніть форму</Modal.Title>
            </Modal.Header>   
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <Form.Label>Додайте файл</Form.Label>
                        <MyInput 
                            type='file'
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={uploadFile}>Завантажити</MyButton>
                <MyButton onClick={hide}>Відхилити</MyButton>
            </Modal.Footer>
        </Modal>
    )
}
