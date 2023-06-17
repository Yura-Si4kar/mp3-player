import React, { useContext } from 'react';
import { Col, Image, ListGroup, Navbar, Row } from 'react-bootstrap';
import { HOME_ROUTE, LIBRARY_ROUTE, LOGIN_ROUTE, SEARCH_ROUTE } from '../../utils/consts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../context';
import { endSession } from '../../firebase/session';
import MyButton from '../UI/button/MyButton';
import './NavBar.css'

export default function NavBar() {
    const { setAuth } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const logOut = () => {
        endSession();
        setAuth(false);
        navigate(LOGIN_ROUTE);
    };

    return (
        <Col sm={3}>
            <Navbar
                className={`d-flex flex-column justify-content-between w-25 h-100`}
                variant="dark"
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    backgroundColor: '#0E002C',
                    transition: 'width 0.3s',
                }}
            >
            <ListGroup
                className="me-auto d-flex flex-column align-items-center w-100"
                style={{ backgroundColor: '#0E002C', border: 'none' }}
            >
                <ListGroup.Item
                    className="w-100"
                    active={HOME_ROUTE === location.pathname}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderLeft: HOME_ROUTE === location.pathname ? '10px solid #D0BB00' : 'inherit',
                    }}
                >
                    <Link to={HOME_ROUTE} className='d-flex align-items-center' style={{ color: '#FFF', textDecoration: 'none' }}>
                        <svg width="30" height="31" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6667 28.6667H26.6667V13.63L15 4.55666L3.33333 13.63V28.6667H13.3333V18.6667H16.6667V28.6667ZM30 30.3333C30 30.7754 29.8244 31.1993 29.5118 31.5118C29.1993 31.8244 28.7754 32 28.3333 32H1.66667C1.22464 32 0.800716 31.8244 0.488156 31.5118C0.175595 31.1993 4.01184e-07 30.7754 4.01184e-07 30.3333V12.8167C-0.000175806 12.5627 0.0576953 12.312 0.169193 12.0838C0.280691 11.8556 0.442867 11.6559 0.643334 11.5L13.9767 1.13C14.2692 0.902404 14.6293 0.778839 15 0.778839C15.3707 0.778839 15.7308 0.902404 16.0233 1.13L29.3567 11.5C29.5571 11.6559 29.7193 11.8556 29.8308 12.0838C29.9423 12.312 30.0002 12.5627 30 12.8167V30.3333Z" fill="white"/>
                        </svg>         
                        Home
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item
                    className="w-100"
                    active={SEARCH_ROUTE === location.pathname}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderLeft: SEARCH_ROUTE === location.pathname ? '10px solid #D0BB00' : 'inherit',
                    }}
                >
                    <Link to={SEARCH_ROUTE} className='d-flex align-items-center' style={{ color: '#FFF', textDecoration: 'none' }}>
                        <svg width="34" height="34" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.0517 24.695L34.19 31.8317L31.8317 34.19L24.695 27.0517C22.0396 29.1804 18.7367 30.3382 15.3333 30.3333C7.05334 30.3333 0.333344 23.6133 0.333344 15.3333C0.333344 7.05334 7.05334 0.333344 15.3333 0.333344C23.6133 0.333344 30.3333 7.05334 30.3333 15.3333C30.3382 18.7367 29.1804 22.0396 27.0517 24.695ZM23.7083 23.4583C25.8235 21.2832 27.0048 18.3674 27 15.3333C27 8.88668 21.7783 3.66668 15.3333 3.66668C8.88668 3.66668 3.66668 8.88668 3.66668 15.3333C3.66668 21.7783 8.88668 27 15.3333 27C18.3674 27.0048 21.2832 25.8235 23.4583 23.7083L23.7083 23.4583Z" fill="white"/>
                        </svg>         
                        Search
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item
                    className="w-100"
                    active={LIBRARY_ROUTE === location.pathname}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderLeft: LIBRARY_ROUTE === location.pathname ? '10px solid #D0BB00' : 'inherit',
                    }}
                >
                    <Link to={LIBRARY_ROUTE} className='d-flex align-items-center' style={{ color: '#FFF', textDecoration: 'none' }}>
                        <svg width="34" height="34" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 0.416656C26.93 0.416656 34.5833 8.06999 34.5833 17.5C34.5833 26.93 26.93 34.5833 17.5 34.5833C8.06999 34.5833 0.416656 26.93 0.416656 17.5C0.416656 8.06999 8.06999 0.416656 17.5 0.416656ZM17.5 24.3333C21.2805 24.3333 24.3333 21.2805 24.3333 17.5C24.3333 13.7194 21.2805 10.6667 17.5 10.6667C13.7194 10.6667 10.6667 13.7194 10.6667 17.5C10.6667 21.2805 13.7194 24.3333 17.5 24.3333ZM17.5 15.7917C18.4396 15.7917 19.2083 16.5604 19.2083 17.5C19.2083 18.4396 18.4396 19.2083 17.5 19.2083C16.5604 19.2083 15.7917 18.4396 15.7917 17.5C15.7917 16.5604 16.5604 15.7917 17.5 15.7917Z" fill="white"/>
                        </svg>
                        Library
                    </Link>
                </ListGroup.Item>
            </ListGroup>
            <Row className="w-100 d-flex">
                <Col xs={6} md={6}>
                <Image src="holder.js/171x180" roundedCircle />
                </Col>
                <Col xs={6} md={6} className="text-end">
                <MyButton onClick={logOut}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                    <path
                        fillRule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                        fillRule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                    </svg>
                </MyButton>
                </Col>
            </Row>  
            </Navbar>
        </Col>
    );
}
