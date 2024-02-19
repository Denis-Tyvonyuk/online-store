import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Dropdown } from "react-bootstrap";
import { deleteType, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const DeleteType = observer(({ show, onHide, device }) => {
  const [typeName, setTypeName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTypes();
        device.setTypes(data);
      } catch (error) {
        console.error("Error fetching types:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [device]);

  const destroyType = async () => {
    try {
      await deleteType(typeName);
      console.log(`Type deleted: ${typeName}`);
      setTypeName(""); // Clear the input field
      onHide(); // Close the modal
    } catch (error) {
      console.error("Error deleting type:", error);
    }
  };

  const selectType = (type) => {
    device.setSelectedType(type);
    setTypeName(type.name);
    console.log(type.name);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          delete type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType?.name || "Choose type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => {
                    selectType(type);
                  }}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          close
        </Button>
        <Button variant="outline-success" onClick={destroyType}>
          delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteType;
