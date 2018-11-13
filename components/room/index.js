import { Entity } from "aframe-react";

const Monitors = () => (
  <Entity position="0 0 20">
    <Entity
      obj-model="obj:/static/models/speaker.obj;mtl:/static/materials/speaker.mtl"
      scale="0.0002 0.0002 0.0002"
      position="-12.646099882718682 0 21.92468823358017"
      rotation="0.36 -94 0"
    />

    <Entity
      obj-model="obj:/static/models/speaker.obj;mtl:/static/materials/speaker.mtl"
      scale="0.0002 0.0002 0.0002"
      position="-19.460184481630908 0 14.514283081233241"
      rotation="0.36 -119.99999999999999 0"
    />
  </Entity>
);

const MovementSign = () => (
  <Entity
    geometry={{
      primitive: "plane",
      width: 1.5,
      height: 1
    }}
    position="0.118 3.6 43.623"
    rotation="6 0 0"
    material={{
      src: "http://127.0.0.1:3000/static/images/movement.gif"
    }}
  />
);

const SightSign = () => (
  <Entity
    geometry={{
      primitive: "plane",
      width: 1.5,
      height: 1
    }}
    position="0.118 4 38.623"
    rotation="6 0 0"
    material={{
      src: "http://127.0.0.1:3000/static/images/sight.gif"
    }}
  />
);

const Floor = () => (
  <Entity
    geometry={{
      primitive: "plane",
      width: 200,
      height: 200
    }}
    position="0 0 50"
    rotation="-90 0 0"
    material={{
      color: "lightgrey"
    }}
  />
);

const Sky = () => <a-sky color="white" />;

export default () => (
  <>
    <Sky />
    <Monitors />
    <MovementSign />
    <SightSign />
    <Floor />
  </>
);
