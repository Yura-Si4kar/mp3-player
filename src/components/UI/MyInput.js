import React from "react";
import { Form } from "react-bootstrap";

export default function MyInput({ ...props }) {
  return <Form.Control {...props} />;
}
