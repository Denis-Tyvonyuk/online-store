import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Dropdown } from "react-bootstrap";
import { deleteBrand, fetchBrands } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const DeleteBrand = observer(({ show, onHide, device }) => {
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBrands();
        device.setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [device]);

  const destroyBrand = async () => {
    try {
      await deleteBrand(brandName);
      console.log(`Brand deleted: ${brandName}`);
      setBrandName(""); // Clear the input field
      onHide(); // Close the modal
    } catch (error) {
      console.error("Error deleting brand:", error);
      // Handle the error as needed
    }
  };

  const selectBrand = (brand) => {
    device.setSelectedBrand(brand);
    setBrandName(brand.name);
    console.log(brand.name);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedBrand?.name || "Choose brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => {
                    selectBrand(brand);
                  }}
                  key={brand.id}
                >
                  {brand.name}
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
        <Button variant="outline-success" onClick={destroyBrand}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteBrand;
