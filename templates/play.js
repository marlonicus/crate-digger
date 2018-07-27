import { Scene } from "aframe-react";
import { map, pathOr, bind } from "ramda";
import spotify from "../utils/spotify";
import Room from "../components/room";
import Crate from "../components/crate";
import Records from "../components/records";
import Camera from "../components/camera";
import { checkTestMode, getRandomColor } from "../utils/misc";
import { userData as mockUserData } from "../data/mock";

const addColoursToRecordItems = userData => ({
  ...userData,
  items: map(item => ({ ...item, color: getRandomColor() }), userData.items)
});

const getRecordFromTrackItem = ({ id, images, name, color }) => ({
  id,
  name,
  color,
  src: images[1].url
});

class PlayTemplate extends React.Component {
  constructor() {
    super();

    this.state = {
      activeRecordIndex: false
    };
  }

  componentDidMount = async () => {
    if (checkTestMode(window)) {
      return this.setState({
        userData: addColoursToRecordItems(mockUserData)
      });
    }

    const userData = await spotify.getTopArtists({
      accessToken: this.props.accessToken
    });

    this.setState({
      userData: addColoursToRecordItems(userData)
    });
  };

  getNumberOfRecords() {
    return pathOr(0, ["state", "userData", "items", "length"], this);
  }

  switchRecord(index) {
    this.setState({
      activeRecordIndex: index
    });
  }

  closeRecord() {
    this.setState({ activeRecordIndex: false });
  }

  render() {
    return (
      <Scene
        vr-mode-ui={{ enabled: true }}
        cursor="rayOrigin: mouse; fuse: false"
        raycaster="objects: .clickable"
      >
        <Room showTurtle={true} />
        <Crate />
        {this.state.userData && (
          <Records
            activeIndex={this.state.activeRecordIndex}
            onRecordSelect={bind(this.switchRecord, this)}
            onRecordClose={bind(this.closeRecord, this)}
            tracks={map(getRecordFromTrackItem, this.state.userData.items)}
          />
        )}
        <Camera />
      </Scene>
    );
  }
}

export default PlayTemplate;
