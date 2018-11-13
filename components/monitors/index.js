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
        position="0 0 0 "
        animation__bounce={{
          property: "position",
          to: `0 ${animate ? (animationState ? "0.07" : "0") : "0"} 0`,
          loop: animate,
          dur: 0,
          delay: 0,
          dir: "normal"
        }}
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
