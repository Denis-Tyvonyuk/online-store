import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import DeleteType from "../components/modals/DeleteType";
import DeleteBrand from "../components/modals/DeleteBrand";
import { Context } from "..";
import DeleteDevice from "../components/modals/DeleteDevice";

const Admin = () => {
  const { device } = useContext(Context);

  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deleteDeviceVisible, setDeleteDeviceVisible] = useState(false);
  const [deleteTypeVisible, setdeleteTypeVisible] = useState(false);
  const [deleteBrandVisible, setdeleteBrandVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-2"
        onClick={() => setTypeVisible(true)}
      >
        add type
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-2"
        onClick={() => setBrandVisible(true)}
      >
        add brand
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-2"
        onClick={() => setDeviceVisible(true)}
      >
        add device
      </Button>
      <Button
        variant={"danger"}
        className="mt-2"
        onClick={() => setdeleteTypeVisible(true)}
      >
        delete type
      </Button>
      <Button
        variant={"danger"}
        className="mt-2"
        onClick={() => setdeleteBrandVisible(true)}
      >
        delete brand
      </Button>
      <Button
        variant={"danger"}
        className="mt-2"
        onClick={() => setDeleteDeviceVisible(true)}
      >
        delete device
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <DeleteType
        show={deleteTypeVisible}
        onHide={() => setdeleteTypeVisible(false)}
        device={device}
      />
      <DeleteBrand
        show={deleteBrandVisible}
        onHide={() => setdeleteBrandVisible(false)}
        device={device}
      />
      <DeleteDevice
        show={deleteDeviceVisible}
        onHide={() => setDeleteDeviceVisible(false)}
        device={device}
      />
    </Container>
  );
};

export default Admin;
