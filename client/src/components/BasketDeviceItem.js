import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { deleteBasketDevice } from "../http/deviceAPI";

const BasketDeviceItem = ({ device, basketId, rating }) => {
  const history = useNavigate();

  return (
    <Col mb={3} className={"mt-3"}>
      <Card style={{ width: 150 }} border="light">
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
          style={{ cursor: "pointer" }}
          onClick={() => history(DEVICE_ROUTE + "/" + device.id)}
        />
        <button
          type="button"
          className="btn-close"
          style={{
            right: "2px",
            position: "absolute",
            backgroundColor: "darkgrey",
          }}
          aria-label="Close"
          onClick={() => {
            deleteBasketDevice(basketId, device.id)
              .then(() => window.location.reload())
              .catch((error) =>
                console.error("Error deleting device from basket:", error)
              );
          }}
        ></button>
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <h5>{device.name}</h5>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image width={18} height={18} src={star} />
          </div>
        </div>
        <div>{device.price}</div>
      </Card>
    </Col>
  );
};

export default BasketDeviceItem;
