import React from "react";
import { Entity } from "aframe-react";

export default ({ children, index }) => (
  <Entity
    obj-model="obj:/static/models/crate.obj"
    scale="1 1 1"
    position={`${(index % 4) * 2.3} -2.5 ${index < 4 ? "0" : "7"}`}
    rotation={`0 ${index < 4 ? "90" : "270"} 0`}
    material="color: #33483d"
  >
    {children}
  </Entity>
);
