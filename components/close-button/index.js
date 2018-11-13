import React from "react";
import { Entity } from "aframe-react";

const CloseButton = props => (
  <Entity
    position="0.28 0.28 0.01"
    geometry={{
      primitive: "plane",
      width: "0.05",
      height: "0.05w",
      color: "#ffff00"
    }}
    material={{ color: "black", roughness: 0.5 }}
    {...props}
  >
    <Entity text={{ value: "x" }} position="0.482 0.005 0" />
  </Entity>
);

export default CloseButton;
