import React from 'react';
import { Modal } from 'react-bootstrap'
import MyButton from '../button/MyButton'

export default function Alert({show, onHide, onAgree}) {
  return (
    <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Body>
            Ви впевнені, що бажаєте видалити цей трек?
        </Modal.Body>
        <Modal.Footer>
            <MyButton variant="secondary" onClick={onHide}>
                Відмінити
            </MyButton>
            <MyButton variant="primary" onClick={onAgree}>Підтвердити</MyButton>
        </Modal.Footer>
    </Modal>
  )
}
