import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  const selectBrand = (brand) => {
    if (device.selectedBrand === brand || !device.selectedBrand) {
      device.setSelectedBrand({});
    } else {
      device.setSelectedBrand(brand);
    }
  };

  return (
    <div className="d-flex" style={{ flexWrap: "wrap", flexDirection: "row" }}>
      {device.brands.map((brand) => (
        <Card
          key={brand.id}
          onClick={() => selectBrand(brand)}
          border={brand.id === device.selectedBrand.id ? "danger" : "light"}
          style={{ cursor: "pointer" }}
          className="p-3"
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});

export default BrandBar;
