import { Component } from "react";
import { Entity } from "aframe-react";

class Camera extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <Entity
        primitive="a-camera"
        look-controls
        // position="0.118 1.600 45.623"
        position="0.118 1.600 0.623"
        rotation="-6.532 0.344 0"
        wasd-controls
      />
    );
  }
}

export default Camera;
