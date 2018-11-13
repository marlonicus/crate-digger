import { Scene } from "aframe-react";
import { map, pathOr, bind } from "ramda";
import spotify from "../utils/spotify";
import Room from "../components/room";
import Loader from "../components/loader";
import Crate from "../components/crate";
import Records from "../components/records";
import Camera from "../components/camera";
import { checkTestMode } from "../utils/misc";
import { userData as mockUserData } from "../data/mock";

const getRecordFromTrackItem = ({ id, images, name }) => ({
  id,
  name,
  src: images[1].url
});

class PlayTemplate extends React.Component {
  constructor() {
    super();

    this.state = {
      viewingRecordIndex: false,
      openRecordIndex: false,
      readyState: 0
    };
  }

  componentDidMount = async () => {
    spotify.connect({
      callback: player => {}
    });

    const userData = await spotify.getTopArtists();

    this.setState({
      userData,
      readyState: 1
    });

    // Nasty, but just a little buffer for the scene to render and add a nice fadeout
    setTimeout(() => {
      this.setState({
        readyState: 2
      });
    }, 700);
  };

  getNumberOfRecords() {
    return pathOr(0, ["state", "userData", "items", "length"], this);
  }

  viewRecord = async index => {
    const { tracks } = await spotify.getTopTracks({
      id: this.state.userData.items[index].id
    });

    const tempo = await spotify.play(tracks[0]);

    this.setState({
      viewingRecordIndex: index,
      tempo
    });
  };

  closeRecord() {
    spotify.pause();
    this.setState({ viewingRecordIndex: false });
  }

  openRecord = async index => {
    this.setState({
      openRecordIndex: index
    });
  };

  render() {
    return (
      <>
        {this.state.readyState < 2 && (
          <>
            <style jsx>{`
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
                opacity: ${1 - this.state.readyState};
              }
            `}</style>
            <div className="cover">
              <Loader />
            </div>
          </>
        )}
        <Scene
          vr-mode-ui={{ enabled: true }}
          cursor="rayOrigin: mouse; fuse: false"
          raycaster="objects: .clickable"
        >
          <Room
            isMusicPlaying={this.state.viewingRecordIndex !== false}
            bpm={this.state.tempo}
          />

          <Crate>
            {this.state.userData && (
              <Records
                viewingRecordIndex={this.state.viewingRecordIndex}
                openRecordIndex={this.state.openRecordIndex}
                onRecordSelect={bind(this.viewRecord, this)}
                onRecordClose={bind(this.closeRecord, this)}
                onRecordOpen={bind(this.openRecord, this)}
                tracks={map(getRecordFromTrackItem, this.state.userData.items)}
              />
            )}
          </Crate>

          <Camera />
        </Scene>
      </>
    );
  }
}

export default PlayTemplate;
