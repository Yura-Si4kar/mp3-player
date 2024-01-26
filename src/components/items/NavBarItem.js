import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '../../context'

export default function NavBarItem({ children, path, src, ...props }) {
    const { app } = useContext(Context);

    return (
        <ListGroup.Item
            className="navbar-item w-100"
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: app.isOpen ? '30px 5px' : '5px 2px'
            }}
        >
            <Link to={path} className='d-flex align-items-center' style={{ color: '#FFF', textDecoration: 'none' }}>
                <img className='mx-2' src={src} alt='house' />       
                <span className='navbar-item-text'>{children}</span>
            </Link>
        </ListGroup.Item>
    )
}
