import React from "react";
import { Entity } from "aframe-react";

const Control = props => (
  <Entity
    {...props}
    className="clickable"
    rotation="0 180 0"
    event-set__mouseenter="material.opacity: 1"
    event-set__mouseleave="material.opacity: 0.8"
    event-set__mousedown="scale: 0.9 0.9 0.9"
    event-set__mouseup="scale: 1 1 1"
  />
);

const RecordControls = ({ closeHandler, saveHandler }) => (
  <Entity>
    {/* Close button */}
    <Control
      geometry={{
        primitive: "plane",
        width: 0.2,
        height: 0.2
      }}
      position="-0.81 1.05 -0.1"
      material={{
        src: "/static/images/close.gif",
        opacity: 0.8
      }}
      events={{ click: closeHandler }}
    />

    <Control
      geometry={{
        primitive: "plane",
        width: 0.45,
        height: 0.2
      }}
      material={{
        src: "/static/images/save.gif",
        opacity: 0.8
      }}
      position="0.65 1.05 -0.1"
      events={{ click: saveHandler }}
    />
  </Entity>
);

export default RecordControls;
