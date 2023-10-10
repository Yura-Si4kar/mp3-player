import React from 'react';
import { Col, Container } from 'react-bootstrap';
import MyButton from '../components/UI/button/MyButton';
import { useNavigate } from 'react-router-dom';
import { ALBUMS_ROUTE } from '../utils/consts';
import SettingsAlbums from '../components/SettingsAlbums';
import settings from '../images/settings.svg';

export default function Settings() {
  const navigate = useNavigate();

  const backToMainPage = () => {
    navigate(ALBUMS_ROUTE);
  }

  return (
    <Col sm={9}>
      <Container>
        <MyButton 
          className='text-white' 
          variant={'link'} 
          onClick={backToMainPage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-caret-right-fill me-2" style={{ transform: 'rotate(180deg)' }} viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
          Назад
        </MyButton>
        <h1 className='d-flex align-items-center mb-3'>
          <img className='me-2' src={settings} alt='settings'/>
          Settings
        </h1>
        <SettingsAlbums/>
      </Container>
    </Col>
  )
}