import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import {
  fetchOneDevice,
  createBasketDevice,
  createOrGetBasket,
  getBasket,
  addRating,
  getRating,
} from "../http/deviceAPI";
import { Context } from "..";
import { getUserInfo } from "../http/userAPI";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const [userId, setUserId] = useState();
  const { id } = useParams();
  const [basketId, setBasketId] = useState();
  const [deviceRating, setDeviceRating] = useState();
  const rating = [1, 2, 3, 4, 5];

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
    getRating(id).then((data) => setDeviceRating(data));
  }, []);

  useEffect(() => {
    const func = async () => {
      // Fetch user info and handle the promise
      await getUserInfo().then((user) => {
        if (user !== "the user is not registered") {
          setUserId(user.id);

          createOrGetBasket(user.id).then((basket) => {
            setBasketId(basket);
          });
        } else {
          console.log("user not register");
        }
      });
      // Create or get basket and handle the promise
    };
    func();
    console.log(device);
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col mb={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          ></Image>
        </Col>
        <Col mb={4}>
          <Row className="d-flex  align-items-center">
            <h2>{device.name}</h2>
            <div
              className="Row"
              style={{
                height: 50,
                width: 150,
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              {rating.map((rating) => (
                <div
                  className="label"
                  key={rating}
                  style={{
                    background: `url(${bigStar}) no-repeat center center`,
                    width: 50,
                    height: 50,
                    backgroundSize: "cover",
                    fontSize: 30,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    addRating(userId, device.id, rating);
                    console.log(rating, device.id, userId);
                  }}
                >
                  {rating}
                </div>
              ))}
              <h1>{deviceRating}</h1>
            </div>
          </Row>
        </Col>
        <Col mb={4}>
          <Card
            className="d-flex align-items-center justify-content-center flex-column"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>{device.price}</h3>
            <Button
              variant={"outline-dark"}
              onClick={() => createBasketDevice(basketId, device.id)}
            >
              put into basket
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-5">
        <h1>description</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "Lightgray" : "transpare",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
