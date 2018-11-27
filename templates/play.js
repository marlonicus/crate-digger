import React from "react";
import { Scene } from "aframe-react";
import { pathOr, bind } from "ramda";
import spotify from "../utils/spotify";
import Room from "../components/room";
import Loader from "../components/loader";
import Crate from "../components/crate";
import Records from "../components/records";
import Camera from "../components/camera";
import { mapIndexed } from "../utils/misc";

class PlayTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewingRecordIndex: false,
      openRecordIndex: false,
      readyState: 0
    };
  }

  async componentDidMount() {
    await spotify.connect();
    const crates = await spotify.getCrates();
    this.setState({
      readyState: 1,
      crates
    });

    // Nasty, but just a little buffer for the scene to render and add a nice fadeout
    setTimeout(() => {
      this.setState({
        readyState: 2
      });
    }, 700);
  }

  getNumberOfRecords() {
    return pathOr(0, ["state", "userData", "items", "length"], this);
  }

  async viewRecord({ recordIndex, crateIndex }) {
    const targetRecord = pathOr(
      0,
      ["state", "crates", crateIndex, "content", "tracks", recordIndex],
      this
    );
    await spotify.play(targetRecord);
    console.log("TARGET RECORD:", recordIndex, crateIndex, targetRecord);

    this.setState({
      viewingRecordIndex: recordIndex
      // tempo
    });
  }

  closeRecord() {
    spotify.pause();
    this.setState({ viewingRecordIndex: false });
  }

  async openRecord({ recordIndex, crateIndex }) {
    this.setState({
      openRecordIndex: recordIndex
      // openCrateIndex: crateIndex
    });
  }

  renderCrate(crate, index) {
    const { viewingRecordIndex, openRecordIndex } = this.state;
    const { tracks } = crate.content;

    return (
      <Crate index={index}>
        {crate.content && (
          <Records
            crateIndex={index}
            viewingRecordIndex={viewingRecordIndex}
            openRecordIndex={openRecordIndex}
            onRecordSelect={bind(this.viewRecord, this)}
            onRecordClose={bind(this.closeRecord, this)}
            onRecordOpen={bind(this.openRecord, this)}
            tracks={tracks}
          />
        )}
      </Crate>
    );
  }

  render() {
    const { crates, viewingRecordIndex, readyState } = this.state;

    return (
      <>
        {readyState < 2 && (
          <>
            <style jsx>
              {`
                .cover {
                  background: white;
                  width: 100vw;
                  height: 100vh;
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 2;
                  opacity: 1;
                  transition: opacity linear 200ms 500ms;
                  opacity: ${1 - readyState};
                }
              `}
            </style>
            <div className="cover">
              <Loader />
            </div>
          </>
        )}
        <Scene vr-mode-ui={{ enabled: true }}>
          <Room isMusicPlaying={viewingRecordIndex !== false} bpm={100} />

          {crates && mapIndexed(bind(this.renderCrate, this), crates)}

          <Camera />
        </Scene>
      </>
    );
  }
}

export default PlayTemplate;
