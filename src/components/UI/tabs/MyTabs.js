import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

export default function MyTabs() {
    return (
        <Tabs
            defaultActiveKey='profile'
            id="uncontrolled-tab-example"
            className="mb-3 d-flex justify-content-end"
        >
            <Tab className='me-2' eventKey='main' title='Main Settings'>
                lskjdhlkgjhslkdjghlskjdhg
            </Tab>
            <Tab className='me-2' eventKey='profile' title='User Settings'>
                <h2>Редагувати профіль: </h2>
            </Tab>
        </Tabs>
    )
}
