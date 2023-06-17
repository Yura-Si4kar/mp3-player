import React from 'react'
import { ButtonGroup, Form } from 'react-bootstrap'
import MyButton from '../components/UI/button/MyButton'

export default function UserInfoPage() {
    return (
        <Form>
            <Form.Text>Додаткова інформація</Form.Text>
            <Form.Group>
                <Form.Label>Ім'я</Form.Label>
                <Form.Control type='text' placeholder="Введіть ваше ім'я"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Прізвище</Form.Label>
                <Form.Control type='text' placeholder="Введіть ваше прізвище"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Нік</Form.Label>
                <Form.Control type='text' placeholder="Введіть ваш нікнейм"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Ваші музичні вподобання</Form.Label>
                <Form.Control type='text' placeholder="Вподобання"/>
            </Form.Group>
            <ButtonGroup>
                <MyButton>Зберегти</MyButton>
                <MyButton>Відхилити</MyButton>
            </ButtonGroup>
        </Form>
    )
}
