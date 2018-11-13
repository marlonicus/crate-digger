import { Entity } from "aframe-react";

const Turntable = ({ onClick }) => (
  <>
    <Entity
      obj-model="obj:/static/models/speaker.obj;mtl:/static/materials/speaker.mtl"
      scale="0.0001 0.0001 0.0001"
      position="-6.8d46158388148284 -0.6702271138656573 6.996902925563271"
      rotation="0.36 -94 0"
    />

    <Entity
      obj-model="obj:/static/models/speaker.obj;mtl:/static/materials/speaker.mtl"
      scale="0.0001 0.0001 0.0001"
      position="-9.432379103209554 -0.67 2.9607066013535066"
      rotation="0.36 -119.99999999999999 0"
    />
  </>
);

export default Turntable;
