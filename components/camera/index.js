import React from "react";
import { Entity } from "aframe-react";
import { lifecycle, compose, pure } from "recompose";
import { partial } from "ramda";
import spotify from "../../utils/spotify";
import SoundManager from "../../utils/sound";

const movementKeys = [65, 87, 68, 83, 37, 38, 39, 40];
const keysPressed = [];

const keydown = event => {
  // Check key is valid movement key, and that we haven't logged it already.
  if (
    movementKeys.indexOf(event.keyCode) > -1 &&
    keysPressed.indexOf(event.keyCode) === -1
  ) {
    keysPressed.push(event.keyCode);
    SoundManager.footsteps();
  }
};

const keyup = event => {
  keysPressed.splice(keysPressed.indexOf(event.keyCode), 1);
  if (keysPressed.length <= 0) {
    SoundManager.footsteps({ stop: true });
  }
};

const withWalkingSounds = lifecycle({
  componentDidMount() {
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
  },

  componentWillUnmount() {
    document.removeEventListener("keydown", keydown);
    document.removeEventListener("keyup", keyup);
  }
});

const dist = (v1, v2) => {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  const dz = v1.z - v2.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const minMax = (min, max, val) => Math.max(min, Math.min(max, Math.abs(val)));

const tick = entity => {
  const distance = dist(entity.getAttribute("position"), { x: 0, y: 0, z: 0 });
  const newVolume = minMax(0, 80, distance * 8);
  spotify.setVolume(100 - newVolume);
  requestAnimationFrame(partial(tick, [entity]));
};

const setCameraRef = entity => {
  requestAnimationFrame(partial(tick, [entity]));
};

const Camera = () => (
  <Entity
    _ref={setCameraRef}
    primitive="a-camera"
    look-controls={{
      pointerLockEnabled: true
    }}
    position="0 0 5"
    rotation="0 0 0"
    wasd-controls
  >
    <a-cursor>
    </a-cursor>
  </Entity>
);

const enhance = compose(
  withWalkingSounds,
  pure
);

export default enhance(Camera);
