import React, { useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import AddDriversForm from "./AddDriversForm";

export default function AddDriver() {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <Modal
      open={isOpen}
      onOpen={open}
      onClose={close}
      trigger={<Button primary>Add Driver(s)</Button>}
    >
      <Modal.Header>Add Driver(s) to List</Modal.Header>
      <Modal.Content>
        <AddDriversForm handleClose={close} />
      </Modal.Content>
    </Modal>
  );
}
