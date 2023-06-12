import React, { useContext } from 'react'
import { Col, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { HOME_ROUTE, LIBRARY_ROUTE, LOGIN_ROUTE, SEARCH_ROUTE } from '../utils/consts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MyButton from './UI/button/MyButton';
import { Context } from '../context';
import { endSession } from '../session';

export default function NavBar() {
    const { setAuth } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const logOut = () => {
        endSession();
        setAuth(false);
        navigate(LOGIN_ROUTE);
        console.log(LOGIN_ROUTE);
    }

    return (
        <Navbar className='d-flex flex-column justify-content-between w-25 h-100' variant="dark" style={{position: 'fixed', left: 0, top: 0, backgroundColor: '#0E002C'}}>
            <Nav className="me-auto d-flex flex-column align-items-center">
                <Nav.Link active={HOME_ROUTE === location.pathname}>
                    <Link to={HOME_ROUTE}>Home</Link>
                </Nav.Link>
                <Nav.Link active={SEARCH_ROUTE === location.pathname}>
                    <Link to={SEARCH_ROUTE}>Search</Link>
                </Nav.Link>
                <Nav.Link active={LIBRARY_ROUTE === location.pathname}>
                    <Link to={LIBRARY_ROUTE}>Library</Link>
                </Nav.Link>
            </Nav>
            <Row className='w-100 d-flex'>
                <Col xs={6} md={6}>
                    <Image src="holder.js/171x180" roundedCircle />
                </Col>
                <Col xs={6} md={6} className='text-end'>
                    <MyButton onClick={logOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </MyButton>
                </Col>
            </Row>
        </Navbar>
    )
}