import { Component } from "react";
import { Entity } from "aframe-react";
import { lifecycle, compose, pure } from "recompose";
import { partial } from "ramda";
import spotify from "../../utils/spotify";
import SoundManager from "../../utils/sound";

const keydown = () => SoundManager.footsteps();
const keyup = () => SoundManager.footsteps({ stop: true });

const withWalkingSounds = lifecycle({
  componentDidMount() {
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);

    return function cleanup() {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("keyup", keyup);
    };
  }
});

const dist = (v1, v2) => {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  const dz = v1.z - v2.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const tick = entity => {
  const distance = dist(entity.getAttribute("position"), { x: 0, y: 0, z: 0 });
  const newVolume = Math.max(0, Math.min(100, Math.abs(distance * 8)));
  spotify.setVolume(100 - newVolume);
  requestAnimationFrame(partial(tick, [entity]));
};

const setCameraRef = entity => {
  requestAnimationFrame(partial(tick, [entity]));
};

class Camera extends React.Component {
  render() {
    return (
      <Entity
        _ref={setCameraRef}
        primitive="a-camera"
        look-controls
        position="0 0 5"
        rotation="0 0 0"
        wasd-controls
      />
    );
  }
}

const enhance = compose(
  withWalkingSounds,
  pure
);

export default enhance(Camera);
