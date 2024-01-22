import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Card, Form, Row } from 'react-bootstrap'
import MyInput from '../components/UI/MyInput';
import { useLocation, useNavigate } from 'react-router';
import { Context } from '../context';
import { ALBUMS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USERS_SETTINGS } from '../utils/consts';
import MyButton from '../components/UI/MyButton';
import { Link } from 'react-router-dom';
import { createUser, signInUser } from '../firebase/userApi';
import { startSession } from '../firebase/session';

export default observer(function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { app } = useContext(Context);
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState('');

  const submit = async() => {
    if (isLogin) {
      try {
        app.setLoading(true);
        const data = await signInUser(email, password);
        startSession(data.user);
        app.setUser(data.user);
        app.setIsAuth(true);
        navigate(ALBUMS_ROUTE);
      } catch (error) {
        alert(error.response.data.message);
        console.error(error.message);
        setError(error.message);
      } finally {
        app.setLoading(false);
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
        app.setIsLoading(true);
        let data = await createUser(email, password);
        startSession(data.user);
        app.setUser(data.user);
        app.setIsAuth(true);
        navigate(USERS_SETTINGS);
      } catch (error) {
        alert(error.response.data.message);
        console.error(error.message);
        app.setIsAuth(false);
        setError(error.message);
      } finally {
        app.setIsLoading(false);
      }
    }
  }

  return (
    <section
        className='auth'
        style={{height: window.innerHeight - 54}}
    >
        <Card className='auth__card p-5'>
            {error && <Alert variant={'danger'}>{ error }</Alert>}     
            <h2 className="auth__card-title m-auto">{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
            <Form className='d-flex flex-column'>           
                <MyInput
                    className='auth__card-input mt-4'
                    placeholder='Введіть ваш email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <MyInput
                    className='auth__card-input mt-4'
                    placeholder='Введіть ваш пароль'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type='password'  
                />
                {!isLogin
                    ?
                    <MyInput
                        className='auth__card-input mt-4'
                        placeholder='Повторіть ваш пароль'
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        type='password'  
                    />
                    :
                    null  
                }  
            </Form>  
            <Row className='auth__card-text mt-4 px-3'>
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
                    className='auth__card-submit mt-3'
                    type="submit"
                    onClick={submit}
                >
                    {isLogin ? 'Увійти' : 'Реєстрація'}
                </MyButton>
            </Row>    
        </Card>
    </section>
  )
})
