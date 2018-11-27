import React from "react";
import { Entity } from "aframe-react";

const Monitor = () => (
  <Entity
    obj-model="obj:/static/models/stereo.obj;mtl:/static/materials/stereo.mtl"
    scale="0.2 0.2 0.2"
    position="0 0 0"
    rotation="0 0 0"
  />
);

export default class Monitors extends React.Component {
  constructor() {
    super();
    this.interval = setInterval(() => {}, 999);
    this.state = {
      animationState: false
    };
  }

  componentDidUpdate(prevProps) {
    /**
     Forgive me for my sins.

     Abandon hope all ye who enter.
    * */

    if (prevProps.animationSpeed !== this.props.animationSpeed) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.setState(({ animationState }) => ({
          animationState: !animationState
        }));
        setTimeout(() => {
          this.setState(({ animationState }) => ({
            animationState: !animationState
          }));
        }, 20);
      }, this.props.animationSpeed);
    }
  }

  render() {
    const { animate } = this.props;
    const { animationState } = this.state;
    return (
      <Entity
        rotation="0 90 0"
        position={`-3.4136829253123455 ${
          animate && animationState ? "0.08" : "0"
        } 3.5545438814079358`}
      >
        <Entity position="-2 -2.8 -0.5" rotation="0 -0 0">
          <Monitor />
        </Entity>
        <Entity position="2 -2.8 -0.5" rotation="0 -0 0">
          <Monitor />
        </Entity>
      </Entity>
    );
  }
}
