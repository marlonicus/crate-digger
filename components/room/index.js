import { Entity } from "aframe-react";

const Monitor = () => (
  <Entity
    obj-model="obj:/static/models/stereo.obj;mtl:/static/materials/stereo.mtl"
    scale="0.2 0.2 0.2"
    position="0 0 0"
    rotation="0 0 0"
  />
);
const Monitors = () => (
  <>
    <Entity position="-2 -2.8 -0.5" rotation="0 -0 0">
      <Monitor />
    </Entity>
    <Entity position="2 -2.8 -0.5" rotation="0 -0 0">
      <Monitor />
    </Entity>
  </>
);

const MovementSign = () => (
  <Entity
    geometry={{
      primitive: "plane",
      width: 1,
      height: 1
    }}
    position="0 1.6 -1.3"
    rotation="0 0 0"
    material={{
      src: "http://127.0.0.1:3000/static/images/movement.gif"
    }}
  />
);

const SightSign = () => (
  <Entity
    geometry={{
      primitive: "plane",
      width: 1,
      height: 1
    }}
    position="0 0.6 -1.3"
    rotation="-3 0 0"
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
      color: "white"
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
