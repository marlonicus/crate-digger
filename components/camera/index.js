import { Entity } from "aframe-react";

class Camera extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <Entity
        primitive="a-camera"
        look-controls
        position="-0.6334362143461938 1.6 -6.065501095741615"
        rotation="180 180 0"
      >
        <Entity
          // @TODO: Enable on mobile only
          // raycaster="objects: .clickable"
          // cursor="fuse: false; fuseTimeout: 500"
          // position="0 0 -1"
          // geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.015"
          // material="color: white; shader: flat"
        />
      </Entity>
    );
  }
}

export default Camera;
