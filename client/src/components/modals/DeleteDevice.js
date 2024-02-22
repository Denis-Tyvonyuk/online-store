import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Dropdown } from "react-bootstrap";
import { deleteDevice, fetchDevices } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const DeleteDevice = observer(({ show, onHide, device }) => {
  const [deviceName, setDeviceName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDevices(null, null, 1, 30).then((data) => {
          device.setDevices(data.rows);
        });

        console.log(device.devices);
      } catch (error) {
        console.error("Error fetching devices:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [device]);

  const destroyDevice = async () => {
    try {
      await deleteDevice(deviceName);
      console.log(`Device deleted: ${deviceName}`);
      setDeviceName(""); // Clear the input field
      onHide(); // Close the modal
    } catch (error) {
      console.error("Error deleting device:", error);
      // Handle the error as needed
    }
  };

  const selectDevice = (selectedDevice) => {
    setDeviceName(selectedDevice.name);
    device.setSelectedDevice(selectedDevice);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedDevice.name || "Choose device"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.devices.map((device) => (
                <Dropdown.Item
                  onClick={() => selectDevice(device)}
                  key={device.id}
                >
                  {device.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={destroyDevice}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteDevice;
