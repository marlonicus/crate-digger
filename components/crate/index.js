import { Entity } from "aframe-react";

export default ({ onClick, children }) => (
  <React.Fragment>
    <Entity
      obj-model="obj:/static/models/small-crate.obj"
      scale="2.57 2 2"
      position="-0.4039940381598095 -0.15575701494627192 -6.679"
      rotation="0 270 -180"
      material="color: #66483d"
      events={{
        mousedown: onClick
      }}
    >
      {children}
    </Entity>
    {/* <Entity
      obj-model="obj:/static/models/big-chest.obj;mtl:/static/materials/big-chest.mtl"
      scale="16 16 16"
      position="-3.0703056082864655 -1.7103249751427276 -6.653139428189727"
      rotation="0 29.999999999999996 0"
    /> */}
    <Entity
      obj-model="obj:/static/models/big-chest.obj;mtl:/static/materials/big-chest.mtl"
      scale="16 16 16"
      position="-0.4841178906999308 -1.791886427289497 -6.51358995032192"
      rotation="0 125.00000000000001 0"
    />
  </React.Fragment>
);
