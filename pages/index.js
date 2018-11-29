import React from "react";
import LoginTemplate from "../templates/login";
import PlayTemplate from "../templates/play";
import Loader from "../components/loader";
import spotify from "../utils/spotify";
import { checkUserIsLoggedIn } from "../utils/misc";

export default class Page extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      mounted: false
    };
  }

  componentDidMount() {
    const accessToken = checkUserIsLoggedIn(window);
    spotify.setAccessToken(accessToken);

    this.setState({
      mounted: true,
      isLoggedIn: accessToken
    });
  }

  render() {
    const { mounted, isLoggedIn } = this.state;

    return (
      <main>
      <style jsx>{`
        canvas {
          background: red;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          display: none;
        }
      `}</style>
        {!mounted ? (
          <Loader />
        ) : isLoggedIn ? (
          <PlayTemplate />
        ) : (
          <LoginTemplate />
        )}
        <canvas id="canvas" width="800" height="400" />
      </main>
    );
  }
}
