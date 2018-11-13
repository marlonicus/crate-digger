import { Entity } from "aframe-react";

export default ({ onClick, children }) => (
  <Entity
    obj-model="obj:/static/models/small-crate.obj"
    scale="2.57 2 2"
    position="0 -2.5 0"
    rotation="0 270 -180"
    material="color: #33483d"
    events={{
      mousedown: onClick
    }}
  >
    {children}
  </Entity>
);
