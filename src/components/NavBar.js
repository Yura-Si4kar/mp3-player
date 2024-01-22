import React, { useContext } from 'react';
import { Col, Image, ListGroup, Navbar, Row } from 'react-bootstrap';
import house from '../img/house.svg';
import disc from '../img/disc.svg';
import loupe from '../img/loupe.svg';
import exit from '../img/exit.svg';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import Player from './UI/Player';
import MyButton from './UI/MyButton';
import { Context } from '../context';
import { ALBUMS_ROUTE, LIBRARY_ROUTE, LOGIN_ROUTE, SEARCH_ROUTE } from '../utils/consts';
import { endSession } from '../firebase/session';

export default observer(function NavBar() {
    const { app } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        app.setUser({});
        app.setIsAuth(false);
        navigate(LOGIN_ROUTE);
        endSession();
    }

    return (
        <Col sm={app.isOpen ? 3 : 1} style={{
            position: 'relative',
            transition: 'width 0.3s',
            backgroundColor: '#0E002C'
        }}>
            <Navbar
                className={`d-flex flex-column justify-content-between w-100 h-100`}
                variant="dark"
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transition: 'width 0.3s',
                }}
            >
            <ListGroup
                className="me-auto d-flex flex-column align-items-center w-100"
                style={{
                    backgroundColor: '#0E002C',
                    border: 'none',
                }}
            >
                <ListGroup.Item
                    className="w-100"
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                    }}
                >
                    <Link to={ALBUMS_ROUTE} className='d-flex align-items-center' style={{ color: '#FFF', textDecoration: 'none' }}>
                        <img className='mx-2' src={house} alt='house' />       
                        {app.isOpen && 'Home'}
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item
                    className="w-100"
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                    }}
                >
                    <Link to={SEARCH_ROUTE} className='d-flex align-items-center' style={{ color: '#FFF', textDecoration: 'none' }}>
                        <img className='mx-2' src={loupe} alt='search' /> 
                        {app.isOpen && 'Search'}    
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item
                    className="w-100"
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                    }}
                >
                    <Link to={LIBRARY_ROUTE} className='d-flex align-items-center' style={{ color: '#FFF', textDecoration: 'none' }}>
                        <img className='mx-2' src={disc} alt='disc' />
                        {app.isOpen && 'Library'}
                    </Link>
                </ListGroup.Item>
            </ListGroup>
            {app.isOpen && <Player />}    
            <Row className="w-100 d-flex">
                <Col xs={6} md={6}>
                    <Image src="holder.js/171x180" roundedCircle />
                </Col>
                <Col xs={6} md={6} className="text-end">
                <MyButton
                    onClick={logOut}        
                >
                    <img src={exit} alt='exit'/>
                </MyButton>
                </Col>
            </Row>  
            </Navbar>
            <MyButton
                variant='outline'
                style={{
                    position: 'absolute',
                    top: 5,
                    right: 0,
                    transform: app.isOpen ? 'rotate(-90deg)' : 'rotate(90deg)',
                    fontSize: '20px',
                    fontWeight: 'bolder',
                    color: 'white'
                }}
                onClick={() => app.setIsOpen(!app.isOpen)}        
            >
                &#8963;
            </MyButton>
        </Col>
    );
})
