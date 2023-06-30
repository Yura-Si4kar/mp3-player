import React, { useContext } from 'react';
import { Col, Image, ListGroup, Navbar, Row } from 'react-bootstrap';
import { HOME_ROUTE, LIBRARY_ROUTE, LOGIN_ROUTE, SEARCH_ROUTE } from '../../utils/consts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../context';
import { endSession } from '../../firebase/session';
import MyButton from '../UI/button/MyButton';
import './NavBar.css'
import house from '../../assets/house.svg';
import disc from '../../assets/disc.svg';
import loupe from '../../assets/loupe.svg';
import exit from '../../assets/exit.svg';
import Player from '../items/Player';
import { observer } from 'mobx-react-lite';

export default observer(function NavBar() {
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
                        <img src={house} alt='house' />       
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
                        <img src={loupe} alt='search' />       
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
                        <img src={disc} alt='disc' />
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
                <MyButton onClick={logOut}>
                    <img src={exit} alt='exit'/>
                </MyButton>
                </Col>
            </Row>  
            </Navbar>
        </Col>
    );
})
