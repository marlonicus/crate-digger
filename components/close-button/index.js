import React from "react";
import { Entity } from "aframe-react";

const CloseButton = props => (
  <Entity
    position="-0.7 0.9 -0.1"
    rotation="0 180 0"
    geometry={{
      primitive: "plane",
      width: "0.25",
      height: "0.05",
      color: "#ffff00"
    }}
    material={{ color: "black", roughness: 0.5 }}
    {...props}
  >
    <Entity text={{ value: "close" }} position="0.482 0.005 0" />
  </Entity>
);

export default CloseButton;
