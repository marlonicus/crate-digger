import React from "react";
import { Entity } from "aframe-react";

const Instructions = () => (
  <>
    {/* Keyboard instructions */}
    <Entity
      geometry={{
        primitive: "plane",
        width: 1,
        height: 1
      }}
      position="0 1.6 -1.3"
      rotation="0 0 0"
      material={{
        src: "/static/images/movement.gif"
      }}
    />

    {/* Mouse instructions */}
    <Entity
      geometry={{
        primitive: "plane",
        width: 1,
        height: 1
      }}
      position="0 0.6 -1.3"
      rotation="-3 0 0"
      material={{
        src: "/static/images/sight.gif"
      }}
    />
  </>
);

export default Instructions;
