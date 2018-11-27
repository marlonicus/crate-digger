import React from "react";
import { Entity } from "aframe-react";

export default ({ children, index }) => (
  <Entity
    obj-model="obj:/static/models/small-crate.obj"
    scale="2.57 2 2"
    position={`${index * 2} -2.5 0`}
    rotation="0 270 -180"
    material="color: #33483d"
  >
    {children}
  </Entity>
);
