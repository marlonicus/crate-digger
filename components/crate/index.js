import React from "react";
import { Entity } from "aframe-react";

export default ({ children, index }) => (
  <Entity
    obj-model="obj:/static/models/small-crate.obj"
    scale="2.57 2 2"
    position={`${(index % 4) * 2} -2.5 ${index < 4 ? "0" : "7"}`}
    rotation={`0 ${index < 4 ? "270" : "90"} -180`}
    material="color: #33483d"
  >
    {children}
  </Entity>
);
