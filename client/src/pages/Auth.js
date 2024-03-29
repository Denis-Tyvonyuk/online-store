import React, { useContext, useRef, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { getUserInfo, login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { createOrGetBasket } from "../http/deviceAPI";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      let basket;

      if (isLogin) {
        data = await login(email, password);
        basket = await createOrGetBasket(data.id);
      } else {
        data = await registration(email, password);
        basket = await createOrGetBasket(data.id);
      }

      user.setUser(true);

      user.setIsAuth(true);
      history(SHOP_ROUTE);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "avtor" : "registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-2"
            placeholder="enter name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-2"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                have not account{" "}
                <NavLink to={REGISTRATION_ROUTE}>register</NavLink>
              </div>
            ) : (
              <div>
                have account <NavLink to={LOGIN_ROUTE}>enter</NavLink>
              </div>
            )}
            <Button variant="outline-success" onClick={click}>
              {isLogin ? "enter" : "register"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
