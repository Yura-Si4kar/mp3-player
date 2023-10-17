import { useContext, useState } from "react";
import { Context } from "../context";
import { uploadAudio } from "../firebase/uploadApi";
import { Form, FormGroup, Modal } from "react-bootstrap";
import MyInput from "./UI/MyInput";
import MyButton from "./UI/MyButton";
import { observer } from "mobx-react-lite";

export default observer(function Modals({ show, hide }) {
    const { main, music } = useContext(Context);
    const [file, setFile] = useState(null);

    const uploadFile = async () => {
        try {
            main.setLoading(true);
            const audioUrl = await uploadAudio(file);
            music.setAudio(audioUrl);
            setFile(null);
            main.setLoading(false);
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
})