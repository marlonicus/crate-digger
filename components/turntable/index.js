import { Entity } from "aframe-react";

const Turntable = ({ onClick }) => (
  <Entity
    obj-model="obj:/static/models/turntable.obj;mtl:/static/materials/turntable.mtl"
    scale="0.0015 0.0015 0.0015"
    position="-4.361213064777393 -0.568567439253602 -4.293583331148955"
    rotation="0 95.43 0"
  />
);

export default Turntable;
