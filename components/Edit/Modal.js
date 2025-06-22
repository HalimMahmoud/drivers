import React, { useState } from "react";
import { Modal, Icon } from "semantic-ui-react";
import EditDriverForm from "./EditDriverFrom";

export default function EditDriver({ driver }) {
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
      trigger={
        <Icon
          link
          circular
          size="small"
          name="edit"
          style={{ float: "right" }}
        />
      }
    >
      <Modal.Header>Edit Driver</Modal.Header>
      <Modal.Content>
        <EditDriverForm driver={driver} handleClose={close} />
      </Modal.Content>
    </Modal>
  );
}
