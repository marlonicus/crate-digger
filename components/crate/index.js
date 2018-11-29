import React from "react";
import { Entity } from "aframe-react";
import canvas from "../../utils/canvas";

export default ({ children, index, labelImage, labelRotation }) => (
  <Entity
    obj-model="obj:/static/models/crate.obj"
    scale="1 1 1"
    position={`${(index % 4) * 2.3} -2.5 ${index < 4 ? "0" : "7"}`}
    rotation={`0 ${index < 4 ? "90" : "270"} 0`}
    material="color: #33483d"
  >
    <Entity
    geometry={{
      primitive: "plane",
      width: 1,
      height: 0.5
    }}
    rotation={`0 -90 ${labelRotation}`}
    position="-0.65 -0.4 0"
    material={{
      src: labelImage,
      opacity: 1
    }} />
    {children}
  </Entity>
);
