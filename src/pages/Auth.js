import React, { useContext, useState } from 'react';
import MyInput from '../components/UI/input/MyInput';
import { Alert, Card, Container, Form, Row } from 'react-bootstrap';
import MyButton from '../components/UI/button/MyButton';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USERS_SETTINGS } from '../utils/consts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { addUserInfo, createUser, getAuthUserId, signInUser } from '../firebase/userActions';
import { startSession } from '../firebase/session';
import { Context } from '../context';

export default function Auth() {
const location = useLocation();
    const navigate = useNavigate();
    const { setAuth } = useContext(Context);
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        if (isLogin) {

            try {
                let loginResponse = await signInUser(email, password);
                startSession(loginResponse.user);
                setAuth(true);
                navigate(HOME_ROUTE);
            } catch (error) {
                console.error(error.message);
                setAuth(false);
                setError(error.message);
            }

        } else {

            if (!email || !password || !repeatPassword) {
                setError('Please fill out all the fields.');
                return;
            }

            if (password !== repeatPassword) {
                setError('Passwords do not match');
                return;
            }

            try {
                let registerResponse = await createUser(email, password);
                startSession(registerResponse.user);
                setAuth(true);
                const userId = await getAuthUserId();
                const albumsReferenses = `users/${userId}/albums`;
                addUserInfo({
                    name: '',
                    nikName: '',
                    albums: albumsReferenses
                });
                navigate(USERS_SETTINGS);
            } catch (error) {
                console.error(error.message);
                setAuth(false);
                setError(error.message);
            }
            
        }
    };

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{ width: 600 }} className='p-5'>
                {error && <Alert variant={'danger'}>{ error }</Alert>}     
                <h2 className="m-auto">{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
                <Form className='d-flex flex-column'>           
                    <MyInput
                        className='mt-3'
                        placeholder='Введіть ваш email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <MyInput
                        className='mt-3'
                        placeholder='Введіть ваш пароль'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'  
                    />
                    {!isLogin
                        ?
                        <MyInput
                            className='mt-3'
                            placeholder='Повторіть ваш пароль'
                            value={repeatPassword}
                            onChange={e => setRepeatPassword(e.target.value)}
                            type='password'  
                        />
                        :
                        null  
                    }  
                </Form>  
                <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                    {isLogin ? 
                        <Form.Text>
                            Немає аккаунта? <Link to={REGISTRATION_ROUTE}>Зареєструйся!</Link>
                        </Form.Text>  
                        :
                        <Form.Text>
                            Уже зареєстровані? <Link to={LOGIN_ROUTE}>Увійдіть!</Link>
                        </Form.Text>  
                    }  
                    <MyButton
                        variant='outline-success'
                        className='mt-3'
                        type="submit" 
                        onClick={submit}  
                    >
                        {isLogin ? 'Увійти' : 'Реєстрація'}
                    </MyButton>
                </Row>    
            </Card>
        </Container>
    )
}
