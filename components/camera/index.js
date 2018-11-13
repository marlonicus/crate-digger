import { Component } from "react";
import { Entity } from "aframe-react";
import { lifecycle, compose, pure } from "recompose";
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

const Camera = () => (
  <Entity
    primitive="a-camera"
    look-controls
    position="0 0 5"
    rotation="0 0 0"
    wasd-controls
  />
);

const enhance = compose(
  withWalkingSounds,
  pure
);

export default enhance(Camera);
