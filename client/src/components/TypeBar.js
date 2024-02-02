import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <ListGroup style={{ width: "200px" }}>
      {device.types.map((type) => (
        <ListGroup.Item
          key={type.id}
          style={{ cursor: "pointer" }}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
