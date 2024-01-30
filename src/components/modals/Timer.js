import React from "react";
import { Modal } from "react-bootstrap";
import MyButton from "../UI/MyButton";

export default function Timer({ show, hide }) {
  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header>
        <Modal.Title>Таймер</Modal.Title>
        <MyButton variant="outline" onClick={hide}>
          &#10060;
        </MyButton>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        Сoming soon!!!
      </Modal.Body>
    </Modal>
  );
}
