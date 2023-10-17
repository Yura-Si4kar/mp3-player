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
    const { main } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        main.setUser({});
        main.setIsAuth(false);
        navigate(LOGIN_ROUTE);
        endSession();
    }

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
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                    }}
                >
                    <Link to={ALBUMS_ROUTE} className='d-flex align-items-center' style={{ color: '#FFF', textDecoration: 'none' }}>
                        <img className='mx-2' src={house} alt='house' />       
                        Home
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
                        Search
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
                        Library
                    </Link>
                </ListGroup.Item>
            </ListGroup>
            <Player />    
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
        </Col>
    );
})
