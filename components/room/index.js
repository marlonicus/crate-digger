import React from "react";
import { Entity } from "aframe-react";
import Monitors from "../monitors";
import Instructions from "../instructions";

const Floor = () => (
  <Entity
    geometry={{
      primitive: "plane",
      width: 200,
      height: 200
    }}
    position="0 -3.1 50"
    rotation="-90 0 0"
    material={{
      color: "lightgrey"
    }}
  />
);

const Sky = () => <a-sky color="white" />;

export default ({ isMusicPlaying, bpm }) => (
  <>
    <Sky />
    <Monitors animate={isMusicPlaying} animationSpeed={(60 / bpm) * 1000 * 2} />
    <Instructions />
    <Floor />
  </>
);
