import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { Row } from "react-bootstrap";
import DeviceItem from "../components/DeviceItem";
import {
  createOrGetBasket,
  fetchOneDevice,
  getBasketDevice,
} from "../http/deviceAPI";
import { getUserInfo } from "../http/userAPI";

const Basket = observer(() => {
  const [dev, setDev] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserInfo();

        // Ensure the basket exists for the user
        const basket = await createOrGetBasket(user.id);
        const deviceData = await getBasketDevice(basket);
        setDeviceInfo(deviceData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      if (deviceInfo) {
        const promises = deviceInfo.map((element) =>
          fetchOneDevice(element.deviceId)
        );

        // Use Promise.all to wait for all promises to resolve
        Promise.all(promises)
          .then((results) => {
            // Log the fetched device details
            setDev(results);
          })
          .catch((error) => {
            console.error("Error fetching device details:", error);
          });
      }
    };

    fetchDeviceDetails();
  }, [deviceInfo]);

  return (
    <Row className="d-flex">
      {/* Render your devices based on deviceInfo */}
      {dev &&
        dev.map((device) => <DeviceItem key={device.id} device={device} />)}
    </Row>
  );
});

export default Basket;
