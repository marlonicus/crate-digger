import { Entity } from "aframe-react"

export default () => (
  <Entity primitive="a-camera" look-controls position="-0.6334362143461938 1.6 -6.065501095741615" rotation="180 180 0">
    <Entity
      primitive="a-cursor"
      cursor={{ fuse: false }}
      material={{ color: "white", shader: "flat", opacity: 0.75 }}
      geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
      event-set__1={{
        _event: "mouseenter",
        scale: { x: 1.4, y: 1.4, z: 1.4 },
      }}
      event-set__1={{
        _event: "mouseleave",
        scale: { x: 1, y: 1, z: 1 },
      }}
      raycaster={{ objects: ".clickable" }}
    />
  </Entity>
)