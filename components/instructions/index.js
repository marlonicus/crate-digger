import React from "react";
import { Entity } from "aframe-react";

const Instructions = () => (
  <>
    {/* Keyboard instructions */}
    <Entity
      geometry={{
        primitive: "plane",
        width: 1,
        height: 1,
        opacity: 0.9
      }}
      position="1000000 1.6 -1.3"
      rotation="0 0 0"
      material={{
        src: "/static/images/movement.gif"
      }}
    />
  </>
);

export default Instructions;
