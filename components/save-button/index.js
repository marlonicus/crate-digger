import React from "react";
import { Entity } from "aframe-react";

const SaveButton = ({ onClick }) => (
  <Entity
    geometry={{
      primitive: "plane",
      width: 0.45,
      height: 0.2
    }}
    className="clickable"
    position="0.65 1.05 -0.1"
    rotation="0 180 0"
    material={{
      src: "/static/images/save.gif",
      opacity: 0.8
    }}
    events={{ click: onClick }}
    event-set__mouseenter="material.opacity: 1"
    event-set__mouseleave="material.opacity: 0.8"
    event-set__mousedown="scale: 0.9 0.9 0.9"
    event-set__mouseup="scale: 1 1 1"
  />
);

export default SaveButton;
