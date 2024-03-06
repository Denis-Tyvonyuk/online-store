import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import {
  createOrGetBasket,
  fetchOneDevice,
  getBasketDevice,
  getRating,
} from "../http/deviceAPI";
import { getUserInfo } from "../http/userAPI";
import BasketDeviceItem from "../components/BasketDeviceItem";

const Basket = observer(() => {
  const [dev, setDev] = useState(null);
  const [basketId, setBasketId] = useState();
  const rating = [];
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserInfo();

        // Ensure the basket exists for the user
        const basket = await createOrGetBasket(user.id);
        const deviceData = await getBasketDevice(basket);
        setBasketId(basket);

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

        const fetchRating = deviceInfo.map((element) => {
          getRating(element.deviceId).then((data) => {
            rating.push(data);
            console.log(typeof data);
          });
        });

        // Use Promise.all to wait for all promises to resolve
        Promise.all(promises)
          .then((results) => {
            // Log the fetched device details
            console.log(results);
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
        dev.map((device, index) => (
          <BasketDeviceItem
            key={index}
            device={device}
            basketId={basketId}
            rating={rating}
          />
        ))}
    </Row>
  );
});

export default Basket;
