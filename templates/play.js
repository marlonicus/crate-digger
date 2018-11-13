import { Scene } from "aframe-react";
import { map, pathOr, bind } from "ramda";
import spotify from "../utils/spotify";
import Room from "../components/room";
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
      openRecordIndex: false
    };
  }

  componentDidMount = async () => {
    spotify.connect({
      callback: player => {}
    });

    const userData = await spotify.getTopArtists();

    this.setState({
      userData
    });
  };

  getNumberOfRecords() {
    return pathOr(0, ["state", "userData", "items", "length"], this);
  }

  viewRecord = async index => {
    const { tracks } = await spotify.getTopTracks({
      id: this.state.userData.items[index].id
    });

    spotify.play({ uri: tracks[0].uri });

    this.setState({
      viewingRecordIndex: index
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
      <Scene
        vr-mode-ui={{ enabled: true }}
        cursor="rayOrigin: mouse; fuse: false"
        raycaster="objects: .clickable"
      >
        <Room showTurtle={true} />

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
    );
  }
}

export default PlayTemplate;
