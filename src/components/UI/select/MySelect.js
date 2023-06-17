import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function MySelect({ options, title, onChange }) {
  return (
    <>
      <Dropdown>
        <DropdownButton title={title}>
          {options.map((option) => (
            <Dropdown.Item key={option.id} onClick={() => onChange(option.title)}>
              {option.title}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Dropdown>
    </>
  );
}